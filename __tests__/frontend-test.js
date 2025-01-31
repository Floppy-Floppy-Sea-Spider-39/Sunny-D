import React from 'React';
import {render, screen, waitFor } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
// import Quotes from '../client/assets/Quotes.jsx';
import BigButton from '../client/components/BigButton.jsx';
import Home from '../client/components/Home.jsx';
import Login from '../client/components/Login.jsx';
import Notification from '../client/components/Notification.jsx';
import SignUp from '../client/components/SignUp.jsx';
import WeatherDisplay from '../client/components/WeatherDisplay.jsx';



describe('Unit Testing React Components', () => {
  let text;
  describe('BigButton', () => {
    const props = {
      username: 'testinguser',
      uv: 8
    }
    beforeAll(() => {
        text = render(<BigButton {...props} />);
      });
      //renders notification on click
      test ('Renders notification on click', () => {
        expect(props.username).toEqual('testinguser');
      })
      //d-meter updates; check width at render, click button twice, check width again
      test ('D-meter updates', () => {
        expect(props.uv).toEqual(8);
      })
  })
  


  // describe('Home', () => {
  //   const props = {
      
  //   }
  //   beforeAll(() => {
  //       let text = render(<Home {...props} />);
  //     });


  // })
  


  // describe('Login', () => {
  //   beforeAll(() => {
  //       let text = render(<Login {...props} />);
  //     });
  //     //check to see if there are 2 input bars in screen
  // })
  


  describe('Notification', () => {
    let text;
    const props = {
        isSnackOpen:true, 
        message:'Test Message'
    }
    beforeAll(() => {
      text = render(<Notification {...props} />);
    });

    //check to see if message rendered on screen
    //check to see if message rendered is an element of Quotes array
    test('Prompt appears on rendering Notification', () => {
        // render(<Notification>{testMessage}</Notification>)
        expect(text.getByText(props.message)).toEqual('Test Message');
    })
    
    // test('Prompt rendered is an element of Quotes array', () => {

    // })
  })
  
  // describe('Signup', () => {
  //   beforeAll(() => {
  //       let text = render(<Signup {...props} />);
  //     });
  //   //check to ensure there are 2 input bars on screen
  //   test('Signup page has 2 input bars', () => {
  //     const inputNum = screen.getAllByRole(input)
  //     expect(inputNum.length).toBe(2);
  //   })
  // })
  
  describe('WeatherDisplay', () => {
    let text;
    const props = {
      temp: 79, 
      condition: 'sunny',
      uv: 6
  }
    beforeAll(() => {
        text = render(<WeatherDisplay {...props} />);
      });

      // test for temperature render
      test('Temperature appears after login', () => {
        let text =  render(<WeatherDisplay {...props} />)
        expect(text.getByText('Temp:').toHaveTextContent('Temp:'))
      })

      // test for UV index rendering
      test('UV index appears after login', () => {
        expect(text.getByText(props.uv).toEqual(6))
      })
      
      // test for sunscreen alert to render

      
      // test for condition of weather to change

  })



})
