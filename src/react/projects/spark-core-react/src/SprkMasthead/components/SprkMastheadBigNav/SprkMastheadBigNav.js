import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SprkMastheadDropdown from '../SprkMastheadDropdown/SprkMastheadDropdown';
import addIdsToArray from '../../../utility/addIdsToArray';

class SprkMastheadBigNav extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      links: this.props.links ? addIdsToArray(this.props.links) : undefined
    });
  }

  render() {
    const {additionalClasses, analyticsString, idString, links, ...rest} = this.props
    return (
      <React.Fragment>
        <div className="sprk-o-Stack__item">
          <nav
            className={classNames("sprk-c-Masthead__big-nav", additionalClasses)}
            data-analytics={analyticsString}
            data-id={idString}
            role="navigation"
            {...rest}>
            <ul
              className="sprk-c-Masthead__big-nav-items sprk-o-Stack sprk-o-Stack--misc-a sprk-o-Stack--center-row sprk-o-Stack--split@xxs sprk-b-List sprk-b-List--bare">
                { this.props.links && this.state.links.map((link) => {

                  const {element, additionalContainerClasses, isActive, text, ...rest} = link;
                  const TagName = element || 'a';
                  return(
                    <li
                      className={classNames(
                        "sprk-c-Masthead__big-nav-item sprk-o-Stack__item",
                        {"sprk-c-Masthead__link--active": isActive},
                        additionalContainerClasses
                      )}
                      key={link.id}>
                      { !link.subNavLinks &&
                        <TagName className={classNames("sprk-b-Link sprk-b-Link--plain sprk-c-Masthead__link sprk-c-Masthead__link--big-nav")}{...rest}>{text}</TagName>
                      }
                      { link.subNavLinks &&
                        <SprkMastheadDropdown choices={{items: link.subNavLinks}} triggerText={link.text}/>
                      }
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

SprkMastheadBigNav.propTypes = {
  // classes to be added to the masthead
  additionalClasses: PropTypes.string,
  // assigned to data-analytics
  analyticsString: PropTypes.string,
  // assigned to data-id
  idString: PropTypes.string,
  // used to render navigation inside
  links: PropTypes.arrayOf(PropTypes.shape({
    // The element to render, can be 'a' or a Component like Link
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    // Classes to apply to the container of the link
    additionalContainerClasses: PropTypes.string,
    // Adds a class if the link is active
    isActive: PropTypes.bool,
    // The link text
    text: PropTypes.string
  }))
};

SprkMastheadBigNav.defaultProps = {
  links: []
};

export default SprkMastheadBigNav;
