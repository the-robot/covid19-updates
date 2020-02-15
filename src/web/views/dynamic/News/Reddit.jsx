import { Icon, IconButton, Timeline } from 'rsuite';
import React from 'react';


class Reddit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refreshing: false,
    }
  }

  componentDidMount() {
    this.setState({
      data: [
        {
          title: 'Wuhan pneumonia: First death reported by mystery Chinese virus',
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
