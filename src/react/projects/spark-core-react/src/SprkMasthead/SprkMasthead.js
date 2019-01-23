import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SprkMastheadMenuIcon from './components/SprkMastheadMenuIcon/SprkMastheadMenuIcon';
import SprkMastheadLittleNav from './components/SprkMastheadLittleNav/SprkMastheadLittleNav';
import SprkMastheadNarrowNav from './components/SprkMastheadNarrowNav/SprkMastheadNarrowNav';

class SprkMasthead extends Component {
  render() {
    const { additionalClasses, analyticsString, idString, littleNavLinks, narrowNavLinks, siteLogo, utilityContents } = this.props;

    return (
      <header className={classNames("sprk-c-Masthead", "sprk-o-Stack", additionalClasses)}
              role="banner"
              data-id={idString}>
        <div className="sprk-c-Masthead__content sprk-o-Stack__item sprk-o-Stack sprk-o-Stack--split@xxs">
          <SprkMastheadMenuIcon/>

          <div className="sprk-c-Masthead__branding sprk-o-Stack__item sprk-o-Stack__item--center-column@xxs">
            <a href="#">
              {siteLogo}
            </a>
          </div>

          <SprkMastheadLittleNav links={littleNavLinks} utilityContents={utilityContents} />

        </div>
        <SprkMastheadNarrowNav links={narrowNavLinks}/>
      </header>
    );
  }
}

SprkMasthead.propTypes = {};
SprkMasthead.defaultProps = {
  utilityContents: ''
};

export default SprkMasthead;