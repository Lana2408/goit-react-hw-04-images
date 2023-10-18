import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Header, Form, Button, Input } from './Searchbar.styled';

import { notifications } from '../notifications/notifications';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { query } = this.state;
    if (query.trim() === '') {
      return toast.info('Please enter key words for search', notifications);
    }

    this.props.onSubmit(query);
    this.setState({
      query: '',
    });
  };


  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit" className="button">
          <FaSearch />
          </Button>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
