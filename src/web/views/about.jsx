import { Icon } from 'rsuite';
import React from 'react';

import Layout from './Layout/Default';

import CONSTANTS from '../constants';


const About = props => {
  const { title } = props;
  const {
    APP_TITLE,
    AUTHOR_NAME,
    GITHUB_PROFILE,
    MY_WEBISTE,
    PROJECT_URL,
    TELEGRAM_BOT,
    TELEGRAM_CHANNEL,
  } = CONSTANTS;

  return (
    <Layout activeSidebarIndex={4} title={title} childProps={props}>
      <div className='about-container'>
        <p className='title'>About <Icon icon='group'/></p>
        
        <div className='message'>
          <p className='text'>
            {APP_TITLE} attempts to give people updated information about Coronavirus (COVID-19) as it
            is spreading around the world. It's been developed by me, {AUTHOR_NAME} (<a href={GITHUB_PROFILE} target='_blank'>Github</a>, <a href={MY_WEBISTE} target='_blank'>Website</a>).

            I have also created <a href={TELEGRAM_BOT} target='_blank'>Telegram bot</a> and <a href={TELEGRAM_CHANNEL} target='_blank'>channel</a> for COVID-19 updates.
          </p>
        </div>

        <div className='message'>
          <p className='text'>
            COVID-19 updates website and telegram bot are both open-source. 
            You can check out the soruce code <a href={PROJECT_URL} target='_blank'>here</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
