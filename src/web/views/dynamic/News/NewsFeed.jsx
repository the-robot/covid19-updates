import { ButtonToolbar, Icon, IconButton, Timeline } from 'rsuite';
import React from 'react';
import axios from 'axios';

import routes from '../../../routes/urls';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      maxPage: 10, //props.maxNewsPage,
      page: 1,

      // UI states
      loading: false,
      refreshing: false,
    }
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          title: 'Wuhan pneumonia: First death reported by mystery Chinese virusWuhan pneumonia: First death reported by mystery Chinese virusWuhan pneumonia: First death reported by mystery Chinese virus',
          link: 'https://www.independent.co.uk/news/world/asia/virus-china-wuhan-pneumonia-deaths-sars-coronavirus-infection-a9279656.html',
          author: 'Shaun Lintern',
          date: '2020-02-12 21:20'
        },
        {
          title: 'Wuhan pneumonia: First death reported by mystery Chinese virus',
          link: 'https://www.independent.co.uk/news/world/asia/virus-china-wuhan-pneumonia-deaths-sars-coronavirus-infection-a9279656.html',
          author: 'Shaun Lintern',
          date: '2020-02-12 08:46'
        },
      ],
    });
  }

  refresh = () => {
    this.setState({
      refreshing: true,
    });
  }

  nextPage = () => {
    const { maxPage, page } = this.state;
    if (page >= maxPage) {
      return;
    }

    this.setState({
      page: page + 1,
    });
  };

  previousPage = () => {
    const { page } = this.state;
    if (page <= 1) {
      return;
    }

    this.setState({
      page: page - 1,
    });
  };

  render() {
    const { data, loading, page, maxPage, refreshing } = this.state;

    return (
      <div className='feed'>
        <p className='title'>News <Icon icon='newspaper-o'/></p>
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
            <Icon icon="circle-o-notch" size='2x' pulse />
          </div>
        ) : (
          <Timeline className='news-list'>
            {data.map((item, index) => (
              <Timeline.Item key={`news-feed-item-${index}`}>
                <p className='list-title'>{item.date} ({item.author})</p>
                <a href={item.link} target='_blank'>{item.title}</a>
              </Timeline.Item>
            ))}
          </Timeline>
        )}

        <ButtonToolbar>
          <IconButton
            disabled={loading || refreshing || (page === 1)}
            appearance="subtle"
            icon={<Icon icon="chevron-left" />}
            placement="left"
            onClick={this.previousPage}
          >
            Prev
          </IconButton>
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

export default NewsFeed;
