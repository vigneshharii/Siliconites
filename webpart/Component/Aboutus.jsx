import React, { Component } from 'react'
import "../Styles/aboutus.css"
import group_image from './group_image.jpg';
import Person from './Person'
class Aboutus extends Component {
  render() {
    return (
      <div className="About_page">
        <h1> ABOUT US</h1>
        <div className="About_us_section">
          <div className="wriiten_About_us">
            <div className='dummy_about'>
                                                                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                          
              We are the members of the team SILICONITES . And our idea is to solve the problem of
              waste segregation . Key feature of our website and app is to locate
              the trash on a map and provide information to
              the people . Whenever a person throws garbage , he/she will notify us and hence it’s location , amount and garbage type
              through our App.
              On WebSite and in App we will show how much and where the garbage is present in an areaon a
              map with the help of heatmap feature.
            </div>
          </div>
          <div className="Group_image">
            <img src={group_image} />
          </div>
        </div>
        <div className="Memeber">
          <div className="Member">
            TEAM MEMBERS
          </div>

          <div className='Member_details'>
            <Person />
          </div>
        </div>

      </div>
    )
  }
}

export default Aboutus
