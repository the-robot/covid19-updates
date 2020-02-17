import { Col, Grid, Row } from 'rsuite';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import Card from '../../Components/Card.jsx';

class Overviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cases: 0,
      deaths: 0,
      recovered: 0,
      lastUpdated: null,
    };
  }

  componentDidMount() {
    const { countriesCasesData } = this.props;
    let cases = 0;
    let deaths = 0;
    let recovered = 0;
    let lastUpdated = null;

    if (countriesCasesData) {
      for (let i=0; i<countriesCasesData.length; i++) {
        cases += countriesCasesData[i].cases || 0;
        deaths += countriesCasesData[i].deaths || 0;
        recovered += countriesCasesData[i].cured || 0;
      }
      lastUpdated = moment(
        countriesCasesData[0].added_date
      ).format('DD-MM-YYYY HH:mm ZZ');
    }
    
    this.setState({
      cases,
      deaths,
      recovered,
      lastUpdated,
    });
  }

  render() {  
    const { cases, deaths, recovered, lastUpdated } = this.state;

    return (
      <Grid fluid>
        <Row>
          <Col xs={24} sm={8}>
            <Card color='#ffa502' count={cases} message={'confirmed infected'} title={'Infections'} />
          </Col>
          <Col xs={24} sm={8}>
            <Card color='#c0392b' count={deaths} message={'confirmed dead'} title={'Deaths'} />  
          </Col>
          <Col xs={24} sm={8}>
            <Card color='#2ecc71' count={recovered} message={'people recovered'} title={'Recovered'} />
          </Col>
        </Row>

        <Row>
          <p className='overview-date'>Last updated: {lastUpdated}</p>
        </Row>
      </Grid>
    );
  }
};

Overviews.propTypes = {
  countriesCasesData: PropTypes.array,
};

Overviews.defaultProps = {
  countriesCasesData: [],
}

export default Overviews;
