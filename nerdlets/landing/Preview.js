import React from 'react';
import { Card, CardHeader, CardBody, GridItem, Link, navigation } from 'nr1';
import PropTypes from 'prop-types';
import * as config from '../config';

class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screenshot: this.props.quickstart.dashboards[
        Math.floor(Math.random() * this.props.quickstart.dashboards.length)
      ].screenshots[0],
    };
  }

  render() {
    let subtitle = '';
    if (this.props.quickstart.authors.length > 0) {
      subtitle = `Created by ${this.props.quickstart.authors.join(', ')}`;
    }
    return (
      <GridItem columnSpan={3}>
        <Link
          className="preview-item"
          to={navigation.getOpenStackedNerdletLocation({
            id: 'viewer',
            urlState: { dashboardId: this.props.quickstart.id },
          })}
        >
          <Card>
            <CardHeader
              title={this.props.quickstart.name}
              subtitle={subtitle}
            />
            <CardBody className="preview-image">
              <img
                src={`${config.URL_DATA_FOLDER}${this.props.quickstart.id}/dashboards/${this.state.screenshot}`}
                alt="Dashboard screenshot"
              />
            </CardBody>
          </Card>
        </Link>
      </GridItem>
    );
  }
}

Preview.propTypes = {
  quickstart: PropTypes.object,
};

export default Preview;
