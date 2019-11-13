import React from 'react';
import {connect} from "react-redux";
import {getMissions} from "../../../reducer/missions";
import {MDBContainer, MDBDataTable} from "mdbreact";
import "./missions.css";

const mapStateToProps = (state) => {
    return {
        missions: state.missions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMissions: () => {
            dispatch(getMissions())
        }
    }
}

class FreelanceMission extends React.Component {

    componentWillMount = async () => {
        let {getMissions} = this.props;
        await getMissions();
    };

    renderMissions = () => {
        let {missions} = this.props;
        if (!missions.missions.length)
            return null;


        let data;

        let columns = [
            {
                label: 'Nom',
                field: 'name',
                sort: 'asc',
            },
            {
                label: 'Description',
                field: 'objet',
                sort: 'asc',
            },
            {
                label: 'Propriétaire',
                field: 'houseOwner',
                sort: 'asc',
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
            },
            {
                label: 'Date',
                field: 'date',
                sort: 'asc',
            },

        ];

        data = {
            columns: columns,
            rows: missions.missions
        };

        return (
            <MDBDataTable
                striped
                bordered
                small
                paging={false}
                data={data}
            />
        )

    };

    render() {
        return (
            <div className="mt-5">
                <MDBContainer>
                    {this.renderMissions()}
                </MDBContainer>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelanceMission)
