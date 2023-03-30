import React from 'React';
import {render, screen, waitFor } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Quotes from './client/assets/Quotes';
import BigButton from './components/BigButton';
import Home from './components/Home';
import Login from './components/Login';
import Notification from './components/Notification';
import SignUp from './components/SignUp';
import WeatherDisplay from './components/WeatherDisplay';



describe('Unit Testing React Components', () => {

  describe('BigButton', () => {
    beforeAll(() => {
        let text = render(<BigButton {...props} />);
      });


  })
  
  describe('Home', () => {
    beforeAll(() => {
        let text = render(<Home {...props} />);
      });


  })
  
  describe('Login', () => {
    beforeAll(() => {
        let text = render(<Login {...props} />);
      });


  })
  
  describe('Notification', () => {
    const props = {
        isSnackOpen:true, 
        message:'Test Message'
    }
    beforeAll(() => {
      let text = render(<Notification {...props} />);
    });
    //check to see if message rendered on screen
    //check to see if message rendered is an element of Quotes array
    test('Prompt appears on rendering Notification', () => {
        // render(<Notification>{testMessage}</Notification>)
        expect(screen.queryByText(props.message)).toEqual('Test Message');
    })
    
    test('Prompt rendered is an element of Quotes array', () => {

    })
  })
  
  describe('Signup', () => {
    beforeAll(() => {
        let text = render(<Signup {...props} />);
      });


  })
  
  describe('WeatherDisplay', () => {
    beforeAll(() => {
        let text = render(<WeatherDisplay {...props} />);
      });


  })



})
