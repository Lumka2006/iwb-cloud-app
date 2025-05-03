import React from 'react';

const Stakeholders = () => {
  // Inline styles for container
  const containerStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '50px',
  };

  // Styles for the stakeholders columns container
  const columnsContainerStyle = {
    display: 'flex',
    gap: '30px', // space between images
    justifyContent: 'center', // center horizontally
    flexWrap: 'wrap', // allow wrapping on smaller screens
  };

  // Styles for individual columns
  const columnStyle = {
    textAlign: 'center',
    maxWidth: '200px',
  };

  return (
    <main
      id="wp--skip--link--target"
      className="wp-block-group is-layout-flow"
      style={containerStyle}
    >
      {/* Spacer */}
      <div
        style={{ height: 'var(--wp--preset--spacing--50)' }}
        aria-hidden="true"
        className="wp-block-spacer"
      />

      {/* Title */}
      <h1 className="has-text-align-center wp-block-post-title">Stakeholders</h1>

      {/* Spacer */}
      <div
        style={{ height: 'var(--wp--preset--spacing--30)' }}
        aria-hidden="true"
        className="wp-block-spacer"
      />

      {/* Content container */}
      <div className="entry-content wp-block-post-content has-global-padding is-layout-constrained">
        {/* Main section */}
        <div
          className="wp-block-group alignfull has-base-2-background-color has-background has-global-padding"
          style={{
            marginTop: 0,
            marginBottom: 0,
            padding: '50px',
          }}
        >
          {/* Heading and description */}
          <div className="wp-block-group is-vertical is-content-justification-center is-layout-flex">
            <h2 className="wp-block-heading has-text-align-center is-style-asterisk">
              <strong>IBW Shareholders</strong>
            </h2>
            <div style={{ height: '0px' }} aria-hidden="true" />
            <p className="has-text-align-center">
              Pioneers in Electronic Recycling & Data Solutions
            </p>
          </div>

          {/* Horizontally aligned pictures */}
          <div style={columnsContainerStyle}>
            {/* Kenneth */}
            <div style={columnStyle}>
              <h3
                className="wp-block-heading has-text-align-left is-style-asterisk"
                style={{ fontStyle: 'normal', fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: '<a href="#"><strong>Kenneth</strong></a>' }}
              />
              <p className="has-text-align-left">Co-Founder</p>
              <img
                src="https://iwb0.wordpress.com/wp-content/uploads/2025/04/ken-3.jpg?w=176"
                alt=""
                style={{ width: '176px', height: '220px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>

            {/* Shadrack */}
            <div style={columnStyle}>
              <h3
                className="wp-block-heading has-text-align-left is-style-asterisk"
                style={{ fontStyle: 'normal', fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: '<a href="#"><strong>Shadrack</strong></a>' }}
              />
              <p className="has-text-align-left">Co-CEO</p>
              <img
                src="https://iwb0.wordpress.com/wp-content/uploads/2025/04/sha.jpg"
                alt=""
                style={{ width: '160px', height: '220px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
          </div>

          {/* Company description */}
          <p className="has-text-align-center" style={{ marginTop: '40px' }}>
            IWB is a Lesotho company that operates under the supervision of Co-Founder Kenneth. 
            The company started in 2024 with a Capital of M100000. During his journey on sourcing funds, Kenneth partnered with Shadrack, who joined as a second CEO of the company. 
            The mandate of IWB is to recycle computer parts; mainly the RAM, Hard Drives and Components of a motherboard. 
            In 2025, the company penetrated the market and became one of the pioneers of electronic recycling in the Southern Region of Africa. 
            The growth of IWB attracted investors, partners and clients outside of Lesotho.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Stakeholders;