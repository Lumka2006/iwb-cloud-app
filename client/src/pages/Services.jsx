import React from 'react';

export default function Services() {
  return (
    <main
      className="wp-block-group is-layout-flow"
      id="wp--skip-link--target"
      style={{ backgroundColor: 'white', color: 'black' }} // Added styles here
    >
      {/* Outer container */}
      <div
        className="wp-block-group has-global-padding is-layout-constrained"
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        {/* Spacer */}
        <div
          style={{ height: 'var(--wp--preset--spacing--50)' }}
          aria-hidden="true"
          className="wp-block-spacer"
        />

        {/* Main Heading */}
        <h1
          className="has-text-align-center wp-block-post-title"
          style={{ backgroundColor: 'white', color: 'black' }}
        >
          Services
        </h1>

        {/* Spacer */}
        <div
          style={{
            marginTop: 0,
            marginBottom: 0,
            height: 'var(--wp--preset--spacing--30)',
          }}
          aria-hidden="true"
          className="wp-block-spacer"
        />
      </div>

      {/* Content section */}
      <div
        className="entry-content wp-block-post-content has-global-padding is-layout-constrained"
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        {/* Main Service Blocks Container */}
        <div
          className="wp-block-group alignfull has-background has-global-padding"
          style={{
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 'var(--wp--preset--spacing--50)',
            paddingRight: 'var(--wp--preset--spacing--50)',
            paddingBottom: 'var(--wp--preset--spacing--50)',
            paddingLeft: 'var(--wp--preset--spacing--50)',
            backgroundColor: 'white', // ensure background is white
            color: 'black', // text color black
          }}
        >
          {/* Inner container with background color and border radius */}
          <div
            className="wp-block-group alignwide has-base-2-background-color has-background has-global-padding"
            style={{
              borderRadius: '16px',
              paddingTop: 'var(--wp--preset--spacing--50)',
              paddingRight: 'var(--wp--preset--spacing--40)',
              paddingBottom: 'var(--wp--preset--spacing--50)',
              paddingLeft: 'var(--wp--preset--spacing--40)',
              backgroundColor: 'white',
              color: 'black',
            }}
          >
            {/* Service columns container */}
            <div
              className="wp-block-group is-layout-flex wp-container-core-group-is-layout-353c4f5a"
              style={{ display: 'flex', backgroundColor: 'white', color: 'black' }}
            >
              {/* RAM Recycling Column */}
              <div
                className="wp-block-column is-layout-flow"
                style={{
                  borderTopColor: 'var(--wp--preset--color--contrast-3)',
                  borderTopWidth: '1px',
                  borderTopStyle: 'solid',
                  paddingTop: 'var(--wp--preset--spacing--30)',
                  paddingRight: 'var(--wp--preset--spacing--30)',
                  paddingBottom: 'var(--wp--preset--spacing--10)',
                  paddingLeft: 'var(--wp--preset--spacing--30)',
                  backgroundColor: 'white',
                  color: 'black',
                }}
              >
                <h5
                  className="wp-block-heading has-text-align-center has-medium-font-size"
                  style={{ textAlign: 'center', fontSize: 'medium' }}
                >
                  <strong>RAM Recycling</strong>
                </h5>

                {/* Spacer */}
                <div
                  style={{ height: 'var(--wp--preset--spacing--10)' }}
                  aria-hidden="true"
                  className="wp-block-spacer"
                />

                {/* Description */}
                <div
                  className="wp-block-group is-vertical is-content-justification-stretch is-layout-flex"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'stretch',
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                >
                  <p
                    className="has-text-align-center"
                    style={{ textAlign: 'center' }}
                  >
                    IWB collects used and damaged RAM sticks, refurbishing functional ones for resale and safely recycling non-functional ones to reduce electronic waste.
                  </p>
                </div>

                {/* Image */}
                <figure className="wp-block-image size-large is-resized">
                  <img
                    src="https://iwb0.wordpress.com/wp-content/uploads/2025/04/ram.jpg"
                    alt="RAM Recycling"
                    width={384}
                    height={220}
                    style={{ width: '183px', height: 'auto' }}
                    srcSet="
                      https://iwb0.wordpress.com/wp-content/uploads/2025/04/ram.jpg 384w,
                      https://iwb0.wordpress.com/wp-content/uploads/2025/04/ram.jpg?w=150 150w,
                      https://iwb0.wordpress.com/wp-content/uploads/2025/04/ram.jpg?w=300 300w"
                    sizes="(max-width: 384px) 100vw, 384px"
                  />
                </figure>
              </div>

              {/* Hard Drive Destruction Column */}
              <div
                className="wp-block-column is-layout-flow"
                style={{
                  borderTopColor: 'var(--wp--preset--color--contrast)',
                  borderTopWidth: '2px',
                  borderTopStyle: 'solid',
                  paddingTop: 'var(--wp--preset--spacing--30)',
                  paddingRight: 'var(--wp--preset--spacing--30)',
                  paddingBottom: 'var(--wp--preset--spacing--10)',
                  paddingLeft: 'var(--wp--preset--spacing--30)',
                  backgroundColor: 'white',
                  color: 'black',
                }}
              >
                <h5
                  className="wp-block-heading has-text-align-center has-x-large-font-size"
                  style={{ textAlign: 'center', fontSize: 'x-large' }}
                >
                  <strong>Hard Drive Destruction</strong>
                </h5>

                {/* Spacer */}
                <div
                  style={{ height: 'var(--wp--preset--spacing--10)' }}
                  aria-hidden="true"
                  className="wp-block-spacer"
                />

                {/* Description */}
                <div
                  className="wp-block-group is-vertical is-content-justification-stretch is-layout-flex"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'stretch',
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                >
                  <p
                    className="has-text-align-center"
                    style={{ textAlign: 'center' }}
                  >
                    IWB securely wipes, refurbishes, or dismantles old hard drives, ensuring data security while reusing or recycling materials like metals and circuit boards.
                  </p>
                </div>

                {/* Image */}
                <figure className="wp-block-image size-large">
                  <img
                    src="https://iwb0.wordpress.com/wp-content/uploads/2025/04/drive.jpg"
                    alt="Hard Drive Destruction"
                    width={332}
                    height={220}
                    style={{ width: '167px', height: 'auto' }}
                    srcSet="
                      https://iwb0.wordpress.com/wp-content/uploads/2025/04/drive.jpg 332w,
                      https://iwb0.wordpress.com/wp-content/uploads/2025/04/drive.jpg?w=150 150w,
                      https://iwb0.wordpress.com/wp-content/uploads/2025/04/drive.jpg?w=300 300w"
                    sizes="(max-width: 332px) 100vw, 332px"
                  />
                </figure>
              </div>

              {/* Motherboard Repurposing Column */}
              <div
                className="wp-block-column is-layout-flow"
                style={{
                  borderTopColor: 'var(--wp--preset--color--contrast-3)',
                  borderTopWidth: '1px',
                  borderTopStyle: 'solid',
                  paddingTop: 'var(--wp--preset--spacing--30)',
                  paddingRight: 'var(--wp--preset--spacing--30)',
                  paddingBottom: 'var(--wp--preset--spacing--10)',
                  paddingLeft: 'var(--wp--preset--spacing--30)',
                  backgroundColor: 'white',
                  color: 'black',
                }}
              >
                <h5
                  className="wp-block-heading has-text-align-center has-x-large-font-size"
                  style={{ textAlign: 'center', fontSize: 'x-large' }}
                >
                  <strong>Motherboard Repurposing</strong>
                </h5>

                {/* Spacer */}
                <div
                  style={{ height: 'var(--wp--preset--spacing--10)' }}
                  aria-hidden="true"
                  className="wp-block-spacer"
                />

                {/* Description */}
                <div
                  className="wp-block-group is-vertical is-content-justification-stretch is-layout-flex"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'stretch',
                    backgroundColor: 'white',
                    color: 'black',
                  }}
                >
                  <p
                    className="has-text-align-center"
                    style={{ textAlign: 'center' }}
                  >
                    The company extracts valuable components from old motherboards, repurposing usable chips and safely disposing of hazardous materials to minimize environmental impact.
                  </p>
                </div>

                {/* Image */}
                <figure className="wp-block-image size-large">
                  <img
                    src="https://iwb0.wordpress.com/wp-content/uploads/2025/04/moth.jpg"
                    alt="Motherboard Recycling"
                    width={272}
                    height={220}
                    style={{ width: '136px', height: 'auto' }}
                    srcSet="
                      https://iwb0.wordpress.com/wp-content/uploads/2025/04/moth.jpg 272w,
                      https://iwb0.wordpress.com/wp-content/uploads/2025/04/moth.jpg?w=150 150w"
                    sizes="(max-width: 272px) 100vw, 272px"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}