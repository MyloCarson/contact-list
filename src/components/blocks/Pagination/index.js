import {useState, useEffect} from 'react';
import {NextIcon, PreviousIcon} from 'src/components/vectors';
import { getUniqueKey, range } from 'src/utils';
import PropTypes from 'prop-types';

const Pagination = ({totalPages, currentPage, onPageChanged}) => {
    const [pageData, setPageData] = useState([])

    const determineActivePageNumber = (pageDataArray, activePage) => {
        return [...pageDataArray].map( x => {
                return {
                    pageNumber: typeof x === 'number' ? x : x.pageNumber,
                    active: typeof x === 'number' ? x === activePage : x.pageNumber === activePage
                }
            })
    }

    const handleClick = (_pageNumber) => {
        setPageData(determineActivePageNumber(pageData, _pageNumber))
        onPageChanged(_pageNumber)
    }

    const goNext = () => {
        if(currentPage < totalPages){
            onPageChanged(currentPage + 1);
        }
    }

    const goPrevious = () => {
        if(currentPage > 1){
            onPageChanged(currentPage - 1);
        }
    }

    useEffect(() => {
        if(totalPages){
            setPageData(determineActivePageNumber(range(1, totalPages), currentPage))
        }
    }, [totalPages, currentPage])
    

    return (
        !totalPages ?
        null :
        (
            <div className="pagination">
                <div className="pagination-icon" onClick={goPrevious}>
                    <PreviousIcon />

                </div>
                <div className="pagination__page-number__container">
                    {
                        pageData && pageData.map( x => (
                            <span key={getUniqueKey()} className={`pagination__page-number ${x.active ? 'active' : ''}`} onClick={() => {handleClick(x.pageNumber)}}>{x.pageNumber}</span>
                        ))
                    }
                    
                </div>
                <div className="pagination-icon" onClick={goNext}>
                <NextIcon />

                </div>
            </div>
        )
    )
}

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired
}

export default Pagination;