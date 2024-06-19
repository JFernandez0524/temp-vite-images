import { toast } from 'react-toastify';
import { useGlobalContext } from './context';

const SearchForm = () => {
  const { setSearchValue } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) {
      toast.error('Search value is empty');
    }
    setSearchValue(searchValue);
  };

  return (
    <section>
      <h1 className='title'> unpslash images</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='search'
          placeholder='cat'
          className='form-input search-input'
        />
        <button type='submit' className='btn'>
          search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
