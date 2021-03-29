import React from 'react';
import {
  AccountPicker,
  Button,
  HeadingText,
  List,
  Link,
  ListItem,
  Grid,
  GridItem,
  navigation,
} from 'nr1';
import InstallationInstructions from './InstallationInstructions';
import PropTypes from 'prop-types';
import * as config from '../config';

class View extends React.Component {
  static getState(props) {
    return {
      quickstart: props.data.quickstarts.find(
        (element) => element.id === props.dashboardId
      ),
      dashboardUrl: '',
      accountId: null,
    };
  }

  constructor(props) {
    super(props);

    this.onChangeAccount = this.onChangeAccount.bind(this);

    this.state = View.getState(props);
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.quickstart || state.quickstart.id !== props.dashboardId) {
      return View.getState(props);
    }
    return null;
  }

  onChangeAccount(event, value) {
    this.setState({
      accountId: value,
    });
  }

  render() {
    if (!this.state.quickstart) {
      return (
        <Grid>
          <GridItem columnSpan={12}>
            <HeadingText
              type={HeadingText.TYPE.HEADING_2}
              className="padding-bottom"
            >
              Item not found
            </HeadingText>
            <Link to="/">
              <Button
                type={Button.TYPE.PRIMARY}
                iconType={Button.ICON_TYPE.LOCATION__LOCATION__HOME}
              >
                Back to listing
              </Button>
            </Link>
          </GridItem>
        </Grid>
      );
    }
    return (
      <>
        <Grid>
          <GridItem columnSpan={3} className="padding-left padding-top">
            <HeadingText type={HeadingText.TYPE.HEADING_2}>
              {this.state.quickstart.name}
            </HeadingText>

            <HeadingText
              type={HeadingText.TYPE.HEADING_3}
              className="padding-top"
            >
              Description
            </HeadingText>
            {this.state.quickstart.description
              .split('\n')
              .map((descriptionLine, index) => {
                return <p key={index}>{descriptionLine}</p>;
              })}

            <HeadingText
              type={HeadingText.TYPE.HEADING_3}
              className="padding-top"
            >
              Requirements
            </HeadingText>
            <p>
              Check if you have all the required datasources for these
              dashboards:
            </p>
            <AccountPicker
              value={this.state.accountId}
              onChange={this.onChangeAccount}
              spacingType={[AccountPicker.SPACING_TYPE.LARGE]}
            />
            <InstallationInstructions
              accountId={this.state.accountId}
              requirements={this.state.quickstart.sources}
              sources={this.props.data.sources}
            />
            {this.state.quickstart.flex.length > 0 && (
              <>
                <HeadingText
                  type={HeadingText.TYPE.HEADING_3}
                  className="padding-top"
                >
                  Flex configuration files
                </HeadingText>
                <p>
                  This dashboard uses custom flex data, please install the
                  following Flex files.
                </p>
                <p>
                  <a
                    href="https://github.com/newrelic/nri-flex/blob/master/docs/basic-tutorial.md"
                    rel="noopener noreferrer"
                    target="_BLANK"
                  >
                    Follow these installation instructions for more information.
                  </a>
                </p>
                <p className="padding-top">Flex configs:</p>
                <ul>
                  {this.state.quickstart.flex.map((flex) => {
                    return (
                      <li key={flex}>
                        <a
                          href={`./data/${this.state.quickstart.id}/flex/${flex}`}
                          target="_BLANK"
                          rel="noopener noreferrer"
                        >
                          {flex}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            <HeadingText
              type={HeadingText.TYPE.HEADING_3}
              className="padding-top"
            >
              Dashboards
            </HeadingText>
            <List rowHeight={16}>
              {this.state.quickstart.dashboards.map((dashboard) => {
                return (
                  <ListItem key={dashboard.filename}>{dashboard.name}</ListItem>
                );
              })}
            </List>

            {this.state.quickstart.authors.length > 0 && (
              <div>
                <HeadingText
                  type={HeadingText.TYPE.HEADING_3}
                  className="padding-top"
                >
                  Authors
                </HeadingText>
                <ul>
                  {this.state.quickstart.authors.map((author) => {
                    return <li key={author}>{author}</li>;
                  })}
                </ul>
              </div>
            )}

            <HeadingText
              type={HeadingText.TYPE.HEADING_3}
              className="padding-top"
            >
              Problems or feedback?
            </HeadingText>
            <Button
              to={`https://github.com/newrelic/nr1-quickstarts/issues/new?labels=bug&title=Problem%20with%20${this.state.quickstart.id}`}
              type={Button.TYPE.PLAIN}
              iconType={
                Button.ICON_TYPE
                  .HARDWARE_AND_SOFTWARE__SOFTWARE__APPLICATION__S_WARNING
              }
            >
              Create a ticket
            </Button>
          </GridItem>

          <GridItem columnSpan={9} className="list-view">
            <Grid>
              {this.state.quickstart.dashboards.map((dashboard) => {
                return (
                  <GridItem key={dashboard.filename} columnSpan={12}>
                    <Grid className="view-item">
                      <GridItem columnSpan={10}>
                        <HeadingText type={HeadingText.TYPE.HEADING_3}>
                          {dashboard.name}
                        </HeadingText>
                      </GridItem>
                      <GridItem columnSpan={2} className="text-right">
                        <Button
                          onClick={() => {
                            navigation.openStackedNerdlet({
                              id: 'transfer',
                              urlState: {
                                dashboardUrl: `${config.URL_DATA_FOLDER}${this.state.quickstart.id}/dashboards/${dashboard.filename}`,
                              },
                            });
                          }}
                          type={Button.TYPE.PRIMARY}
                          iconType={
                            Button.ICON_TYPE.INTERFACE__OPERATIONS__IMPORT
                          }
                        >
                          Import
                        </Button>
                      </GridItem>
                      {dashboard.screenshots.map((screenshot) => {
                        return (
                          <GridItem key={screenshot} columnSpan={6}>
                            <img
                              src={`${config.URL_DATA_FOLDER}${this.state.quickstart.id}/dashboards/${screenshot}`}
                              className="card-img-top"
                              alt="..."
                            />
                          </GridItem>
                        );
                      })}
                    </Grid>
                  </GridItem>
                );
              })}
            </Grid>
          </GridItem>
        </Grid>
      </>
    );
  }
}

View.propTypes = {
  dashboardId: PropTypes.string,
  data: PropTypes.object,
};

export default View;
