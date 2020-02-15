import { Icon, IconButton, Timeline } from 'rsuite';
import React from 'react';
import axios from 'axios';

import routes from '../../../routes/urls';


class Reddit extends React.Component {
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
    axios.get(`${routes.api.reddit}/${page}`)
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
    const { data, refreshing } = this.state;

    return (
      <div className='feed'>
        <p className='title'>Reddit <Icon icon='reddit-alien'/></p>
        <IconButton
          appearance="subtle"
          className='refresh'
          disabled={refreshing}
          size="sm"
          icon={<Icon icon="refresh" spin={refreshing} />}
          onClick={this.refresh}
        />
        <br clear='both'/>

        {refreshing ? (
          <div className='loader'>
            <Icon icon="circle-o-notch" size='2x' pulse />
          </div>
        ) : (
          <Timeline className='reddit-list'>
            {data.map((item, index) => (
              <Timeline.Item key={`reddit-feed-item-${index}`}>
                <p className='list-title'>{item.date} ({item.author})</p>
                <a href={item.link} target='_blank'>{item.title}</a>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </div>
    );
  };
};

export default Reddit;
