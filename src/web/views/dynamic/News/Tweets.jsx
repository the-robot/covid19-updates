import { Icon, IconButton, Timeline } from 'rsuite';
import React from 'react';


class Tweets extends React.Component {
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
          title: `The government says it'll decide later this month whether to postpone exams being as #HongKong schools are closed over the #coronavirus, adding that students' lives are more important. But one student tells RTHK the govt's approach is \"retarded\". https://news.rthk.hk/rthk/en/component/k2/1507028-20200206.htm …`,
          link: 'https://www.independent.co.uk/news/world/asia/virus-china-wuhan-pneumonia-deaths-sars-coronavirus-infection-a9279656.html',
          author: 'Shaun Lintern',
          date: '2020-02-12 21:20'
        },
        {
          title: `#CDC officers sending #WuhanCoronovirus infected patients off to quarantine centers. \n\nMore and more people are taken away in this manner. \n\n#Chinazi #ConcentrationCamps \n#WuhanOutbreak #WuhanLockDownpic.twitter.com/wALxkapzni`,
          link: 'https://www.independent.co.uk/news/world/asia/virus-china-wuhan-pneumonia-deaths-sars-coronavirus-infection-a9279656.html',
          author: 'Shaun Lintern',
          date: '2020-02-12 08:46'
        },
        {
          title: `#CDC officers sending #WuhanCoronovirus infected patients off to quarantine centers. \n\nMore and more people are taken away in this manner. \n\n#Chinazi #ConcentrationCamps \n#WuhanOutbreak #WuhanLockDownpic.twitter.com/wALxkapzni`,
          link: 'https://www.independent.co.uk/news/world/asia/virus-china-wuhan-pneumonia-deaths-sars-coronavirus-infection-a9279656.html',
          author: 'Shaun Lintern',
          date: '2020-02-12 08:46'
        },
        {
          title: `#CDC officers sending #WuhanCoronovirus infected patients off to quarantine centers. \n\nMore and more people are taken away in this manner. \n\n#Chinazi #ConcentrationCamps \n#WuhanOutbreak #WuhanLockDownpic.twitter.com/wALxkapzni`,
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
        <p className='title'>Tweets <Icon icon='twitter'/></p>
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
      </div>
    );
  };
};

export default Tweets;
