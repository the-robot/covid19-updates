import { ButtonToolbar, Icon, IconButton, Timeline } from 'rsuite';
import React from 'react';
import axios from 'axios';

import routes from '../../../routes/urls';


class Tweets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      maxPage: null,
      page: 1,

      // UI states
      loading: false,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, this.getData);
  }

  refresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
    }, this.getData);
  }

  nextPage = () => {
    const { maxPage, page } = this.state;
    if (page >= maxPage) {
      return;
    }

    this.setState({
      page: page + 1,
      loading: true,
    }, this.getData);
  };

  previousPage = () => {
    const { page } = this.state;
    if (page <= 1) {
      return;
    }

    this.setState({
      page: page - 1,
      loading: true,
    }, this.getData);
  };

  getData = () => {
    const { page } = this.state;
    axios.get(`${routes.api.tweets}${page}`)
        .then(res => {
          const { data, page, total_pages } = res.data;
          this.setState({
            data,
            page,
            maxPage: total_pages,
            loading: false,
            refreshing: false,
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            refreshing: false,
          });
        });
  };

  render() {
    const { data, loading, page, maxPage, refreshing } = this.state;

    return (
      <div className='feed'>
        <p className='title'>Tweets <Icon icon='twitter'/></p>
        <IconButton
          appearance="subtle"
          className='refresh'
          disabled={loading||refreshing}
          size="sm"
          icon={<Icon icon="refresh" spin={refreshing} />}
          onClick={this.refresh}
        />
        <br clear='both'/>

        {loading||refreshing ? (
          <div className='loader'>
            <Icon icon="circle-o-notch"size='2x' pulse />
          </div>
        ) : (
          <Timeline className='tweets-list'>
            {data.map((item, index) => (
              <Timeline.Item key={`tweets-feed-item-${index}`}>
                <p className='list-title'>{item.date} ({item.author})</p>
                <a href={item.link} target='_blank'>{item.title}</a>
              </Timeline.Item>
            ))}
          </Timeline>
        )}

        <ButtonToolbar className='paginator'>
          <IconButton
            disabled={loading || refreshing || (page === 1)}
            appearance="subtle"
            icon={<Icon icon="chevron-left" />}
            placement="left"
            onClick={this.previousPage}
          >
            Prev
          </IconButton>
          { page && maxPage ? (
            <span className='page'>{page}/{maxPage}</span>
          ) : null}
          <IconButton
            disabled={loading || refreshing || (page === maxPage)}
            appearance="subtle"
            icon={<Icon icon="chevron-right" />}
            placement="right"
            onClick={this.nextPage}
          >
            Next
          </IconButton>
        </ButtonToolbar>
      </div>
    );
  };
};

export default Tweets;
