import React from 'react'
import Me from '../../assets/HerroSectionImageMe/me-1.png'
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa'
import './About.css'

export default function About() {
  return (
    <div className='about'>
        <div className='about-content'>
            <div className='about-img'>
                <img src={Me} alt="Abdullahi Suleiman" />
                  <div className='about-icons'>
                  <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={24} />
                  </a>
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} />
                  </a>
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={24} />
                  </a>
                </div>
            </div>
            <div className='about-text'>
                <h1>About Me</h1>
                <p>
                    I’m a UX/UI designer who specializes in creating beautiful and functional digital experiences. 
                    I have a passion for design and a keen eye for detail, which allows me to create user-friendly interfaces that are both aesthetically pleasing and easy to navigate.
                </p>
                <p>
                    With over 2 years of experience in the field, I have worked on a variety of projects, from small startups to large corporations. 
                    My goal is to help businesses achieve their objectives through effective design solutions.
                </p>
                <div className='about-btns'>
                    <button className='btn primary'>My Projects</button>
                    <button className='btn outline'>Say Hello</button>
                </div>
            </div>
        </div>
      
    </div>
  )
}
