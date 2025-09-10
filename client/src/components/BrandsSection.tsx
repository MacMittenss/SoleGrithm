export default function BrandsSection() {
  return (
    <section 
      id="brands" 
      className="section"
      style={{
        backgroundColor: 'var(--black)',
        color: 'var(--white)',
        fontFamily: 'Inter, sans-serif',
        minHeight: '100vh',
        padding: '4.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="w-layout-blockcontainer container w-container" style={{ maxWidth: '940px', margin: '0 auto' }}>
        
        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '7.8vw' }}>
          <h5 style={{ 
            letterSpacing: '0.14vw', 
            textTransform: 'uppercase', 
            fontSize: '0.89vw', 
            fontWeight: 400, 
            lineHeight: '1.44vw',
            marginBottom: '1.1vw',
            color: 'var(--white)'
          }}>
            Trusted Partners
          </h5>
          <h2 
            style={{ 
              letterSpacing: '-0.07vw',
              textTransform: 'capitalize',
              fontSize: '4.44vw',
              fontWeight: 500,
              lineHeight: '5vw',
              marginBottom: '2.2vw',
              color: 'var(--white)'
            }}
          >
            Iconic Brands
          </h2>
        </div>

        {/* Brands Grid */}
        <div 
          className="brands-wrapper"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.2vw',
            alignItems: 'center'
          }}
        >
          {/* First Row */}
          <div 
            className="brands-grid"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.2vw',
              flexWrap: 'wrap',
              width: '100%'
            }}
          >
            <div 
              className="logos-wrapper"
              style={{
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--secondary)',
                padding: '2.2vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '15vw',
                minHeight: '10vw',
                transition: 'filter 0.2s ease-in-out',
                cursor: 'pointer'
              }}
            >
              <img alt="brand logo" src="/images/load.png" loading="eager" style={{
                maxWidth: '100%',
                height: 'auto',
                filter: 'brightness(1)',
                transition: 'filter 0.2s ease'
              }} />
            </div>
            <div 
              className="logos-wrapper"
              style={{
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--secondary)',
                padding: '2.2vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '15vw',
                minHeight: '10vw',
                transition: 'filter 0.2s ease-in-out',
                cursor: 'pointer'
              }}
            >
              <img
                loading="eager"
                src="/images/logowithname3.png"
                alt="brand logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'brightness(1)',
                  transition: 'filter 0.2s ease'
                }}
              />
            </div>
            <div 
              className="logos-wrapper"
              style={{
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--secondary)',
                padding: '2.2vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '15vw',
                minHeight: '10vw',
                transition: 'filter 0.2s ease-in-out',
                cursor: 'pointer'
              }}
            >
              <img
                loading="eager"
                src="/images/logowithname2.png"
                alt="brand logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'brightness(1)',
                  transition: 'filter 0.2s ease'
                }}
              />
            </div>
            <div 
              className="logos-wrapper"
              style={{
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--secondary)',
                padding: '2.2vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '15vw',
                minHeight: '10vw',
                transition: 'filter 0.2s ease-in-out',
                cursor: 'pointer'
              }}
            >
              <img
                loading="eager"
                src="/images/logowithname1.png"
                alt="brand logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'brightness(1)',
                  transition: 'filter 0.2s ease'
                }}
              />
            </div>
          </div>
          
          {/* Second Row */}
          <div 
            className="brands-grid"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2.2vw',
              flexWrap: 'wrap',
              width: '100%'
            }}
          >
            <div 
              className="logos-wrapper"
              style={{
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--secondary)',
                padding: '2.2vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '15vw',
                minHeight: '10vw',
                transition: 'filter 0.2s ease-in-out',
                cursor: 'pointer'
              }}
            >
              <img
                loading="eager"
                src="/images/logowithname1.png"
                alt="brand logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'brightness(1)',
                  transition: 'filter 0.2s ease'
                }}
              />
            </div>
            <div 
              className="logos-wrapper"
              style={{
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--secondary)',
                padding: '2.2vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '15vw',
                minHeight: '10vw',
                transition: 'filter 0.2s ease-in-out',
                cursor: 'pointer'
              }}
            >
              <img
                loading="eager"
                src="/images/logowithname2.png"
                alt="brand logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'brightness(1)',
                  transition: 'filter 0.2s ease'
                }}
              />
            </div>
            <div 
              className="logos-wrapper"
              style={{
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--secondary)',
                padding: '2.2vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '15vw',
                minHeight: '10vw',
                transition: 'filter 0.2s ease-in-out',
                cursor: 'pointer'
              }}
            >
              <img
                loading="eager"
                src="/images/logowithname3.png"
                alt="brand logo"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'brightness(1)',
                  transition: 'filter 0.2s ease'
                }}
              />
            </div>
            <div 
              className="logos-wrapper"
              style={{
                borderRadius: 'var(--border-radius)',
                backgroundColor: 'var(--secondary)',
                padding: '2.2vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '15vw',
                minHeight: '10vw',
                transition: 'filter 0.2s ease-in-out',
                cursor: 'pointer'
              }}
            >
              <img alt="brand logo" src="/images/load.png" loading="eager" style={{
                maxWidth: '100%',
                height: 'auto',
                filter: 'brightness(1)',
                transition: 'filter 0.2s ease'
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}