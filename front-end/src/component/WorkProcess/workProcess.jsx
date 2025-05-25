import React from 'react';
import './WorkProcess.css';

const workSteps = [
  {
    id: 1,
    title: 'Research',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu.',
    icon: '📅',
  },
  {
    id: 2,
    title: 'Analyze',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu.',
    icon: '📈',
  },
  {
    id: 3,
    title: 'Design',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu.',
    icon: '✏️',
  },
  {
    id: 4,
    title: 'Launch',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu.',
    icon: '💻',
  },
];

const WorkProcess = () => {
  return (
    <section className="work-process" id="work-process">
      <div className="wp-container">
        <div className="wp-left">
          <h2>Work Process</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus arcu, varius eget velit non, laoreet imperdiet orci.</p>
          <p>Mauris ultrices eget lorem ac vestibulum. Suspendis imperdiet, varius eget velit non.</p>
        </div>

        <div className="wp-right">
          {workSteps.map((step) => (
            <div className="wp-card" key={step.id}>
              <div className="wp-icon">{step.icon}</div>
              <h3>{step.id}. {step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
