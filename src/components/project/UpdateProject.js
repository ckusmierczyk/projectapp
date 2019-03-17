import React, {Component} from "react";
import {createProject, getProject} from "../../actions/projectActions";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import classnames from "classnames";
import {bindActionCreators} from "redux";

class UpdateProject extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const updateProject = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };
        this.props.createProject(updateProject, this.props.history);
    }

    /**
     * in this method i do API call
     * I do it when component is loaded, I am taking project identifier from props and do API call with it
     */
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getProject(id, this.props.history);

    }

    /**
     *in this method i decalre what happend after component will receive props(after API call)
     */
    // UNSAFE
    componentWillReceiveProps(nextProps) {
        if (nextProps.project) {
            const {
                id,
                projectName,
                projectIdentifier,
                description,
                start_date,
                end_date
            } = nextProps.project;
            this.setState({
                id,
                projectName,
                projectIdentifier,
                description,
                start_date,
                end_date
            })
        }
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    // static getDerivedStateFromProps(nextProps) {
    //     if (nextProps.project) {
    //         const {
    //             id,
    //             projectName,
    //             projectIdentifier,
    //             description,
    //             start_date,
    //             end_date
    //         } = nextProps.project;
    //         return {
    //             id,
    //             projectName,
    //             projectIdentifier,
    //             description,
    //             start_date,
    //             end_date
    //         }
    //     }
    //     else return null;
    // }

    render() {
        const {errors} = this.state;
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create / Edit Project form</h5>
                            <hr/>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">

                                    <input type="text" className={classnames("form-control form-control-lg ", {
                                        "is-invalid": errors.projectName
                                    })}
                                           name="projectName"
                                           value={this.state.projectName}
                                           onChange={this.onChange}/>
                                    {
                                        errors.projectName
                                            ? <div className="text-danger">{errors.projectName}</div>
                                            : null
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           value={this.state.projectIdentifier}
                                           name="projectIdentifier"
                                           disabled/>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg"
                                              value={classnames(this.state.description, {
                                                  "is-invalid": errors.description
                                              })}
                                              name="description"
                                              onChange={this.onChange}
                                    ></textarea>
                                    {
                                        errors.description
                                            ? <div className="text-danger">{errors.description}</div>
                                            : null
                                    }
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg"
                                           name="start_date"
                                           value={this.state.start_date}
                                           onChange={this.onChange}
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg"
                                           name="end_date"
                                           value={this.state.end_date}
                                           onChange={this.onChange}/>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getProject: getProject,
        createProject: createProject,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        project: state.project.project,
        errors: state.errors
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(UpdateProject);