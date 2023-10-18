import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Header, Form, Button, Input } from './Searchbar.styled';

import { notifications } from '../notifications/notifications';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (query.trim() === '') {
      return toast.info('Please enter keywords for search', notifications);
    }

    onSubmit(query);
    setQuery(''); // Очищуємо поле вводу після сабміту форми
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" className="button">
          <FaSearch />
        </Button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};

export default Searchbar;
