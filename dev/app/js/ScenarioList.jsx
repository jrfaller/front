import React from 'react';
import {isLoggedIn} from './authenticationService.js';
import {getScenario} from './scenarioService.js';
import Scenario from './Scenario.jsx';
import Loader from 'react-loader';
import { PageHeader, Accordion, Col, Alert, Row } from 'react-bootstrap';

const REFRESH_TEMPO = 5000;

export default class ScenarioList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			scenarii : [],
			loaded : false,
			intervalId: null
		};
	}

	componentDidMount() {
		let interval = setInterval(
			() => {
				if (isLoggedIn()) {
					//console.log('Scenario and logged');
					this.setState( (prevState) => {
						return {
							scenarii: prevState.scenarii,
							loaded: false,
							intervalId: prevState.intervalId
						};
					});
					getScenario()
						.then(fetchedScenarii => {
							//console.log('fetched');
							this.setState( (prevState) => {
								return {
									scenarii: fetchedScenarii,
									loaded: true,
									intervalId: prevState.intervalId
								};
							});
						})
						.catch((err) => {
							//console.log(`error:${err}`);
							this.setState( (prevState) => {
								return {
									scenarii: [],
									loaded: true,
									intervalId: prevState.intervalId
								};
							});
						});
				}
			}, REFRESH_TEMPO);

		this.state = {
			scenarii : [],
			intervalId: interval
		};
	}

	componentWillUnmount () {
		clearInterval(this.state.intervalId);
	}

	render() {
		//console.log('render');
		if (isLoggedIn()) {
			var scenarii = this.state.scenarii.map( (scenario,i) => <Scenario indice={i+1} scenario={scenario} key={scenario._id} eventKey={i}  />);
			return (
				<div>
					<Row>
						<Col xs={12} md={12} >
							<PageHeader>Your scenario</PageHeader>
							<Accordion>{scenarii}</Accordion>
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={12} >
							<Loader loaded={this.state.loaded}>
								<Alert bsStyle="success">
							All scenario have been loaded !
								</Alert>	
							</Loader>
						</Col>
					</Row>
				</div>
			);
		} else {
			return (<Alert bsStyle="warning">
				<strong>You are not yet logged in !</strong>
			</Alert>);
		}
	}

}
