import ContactsPage from 'src/pages/ContactsPage';
import ContactProvider from 'src/components/helper/ContactProvider';

import 'src/scss/styles.scss';

function App() {
  return (
    <ContactProvider>
        <ContactsPage />
    </ContactProvider>
  );
}

export default App;
