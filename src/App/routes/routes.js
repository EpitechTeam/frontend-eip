import {Switch, Redirect} from "react-router-dom";
import React from 'react';
import {renderRoutes} from "react-router-config";
import Home from '../../view/home/home'
import PageNotFound from '../../view/404/404.js'
import Proprietaire from '../../view/proprietaire/proprietaire'
import {getHomeData} from '../../reducer/home'
import ConfierVosBiens from '../../view/page/confier-vos-biens/confier-vos-biens'
import LaisserVousGuider from '../../view/page/laisser-vous-guider/laisser-vous-guider'
import Recherche from '../../view/recherche/recherche'
import FreelanceMission from '../../view/partenaire/mission/mission'
import DashboardFreelance from '../../view/partenaire/dashboard/dashboard'
import Messages from '../../view/messages/messages'
import DevenirFreelance from '../../view/partenaire/devenirFreelance/devenir-freelance'
import { freelanceAuthenticate, adminAndProprioAuthenticate } from "./middleware";
import Profile from "../../view/profile/profile";
import EditProfile from "../../view/profile/edit";
import DevenirProprietaire from "../../view/proprietaire/devenirProprietaire/devenirProprietaire";
import { getProfileUrl } from "../../reducer/profile";
import CreationCompte from "../../view/proprietaire/creationCompte/creationCompte";
import ResetToken from "../../component/resetToken/resetToken";
import DebugMission from "../../view/debug/debug"
import MainCheckout from "../../view/proprietaire/creationCompte/main-checkout";
import ValidEmail from "../../component/validEmail/validEmail";
import FreelanceMissionPage from "../../view/partenaire/mission/missionPage";

export const Routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        loadData: () => getHomeData()
    },
    {
        path: '/profile',
        exact: true,
        component: Profile,
    },
    {
        path: '/profile/parameters',
        exact: true,
        render: () => freelanceAuthenticate() ? <EditProfile /> : <Redirect to="/"/>,
    },
    {
        path: '/profile/:name',
        exact: true,
        component: Profile,
        loadData : (match) => getProfileUrl(match.params.name)
    },
    {
        path: '/proprietaire',
        exact: true,
        component: Proprietaire,
    },
    {
        path: '/recherche/:ville?',
        exact: true,
        component: Recherche
    },
    {
        path: '/confier-vos-biens',
        exact: true,
        component: ConfierVosBiens
    },
    {
        path: '/create-profile',
        exact: true,
        component: DevenirFreelance
    },
    {
        path: '/create-profile-proprietaire',
        exact: true,
        component: DevenirProprietaire
    },
    {
        path: '/create-profile-proprietaire/plan',
        exact: true,
        component: CreationCompte
    },
    {
        path: '/create-profile-proprietaire/checkout',
        exact: true,
        component: MainCheckout
    },
    {
        path: '/laisser-vous-guider',
        exact: true,
        component: LaisserVousGuider
    },
    {
        path: '/app/missions',
        exact: true,
        render: () => freelanceAuthenticate() ? <FreelanceMission /> : <Redirect to="/"/>
    },
    {
        path: '/app/missions/:missionId',
        exact: true,
        render: () => freelanceAuthenticate() ? <FreelanceMissionPage /> : <Redirect to="/"/>
    },
    {
        path: '/app/dashboard',
        exact: true,
        render: () => freelanceAuthenticate() ? <DashboardFreelance /> : <Redirect to="/"/>
    },
    {
        path : '/reset/:token',
        exact : true,
        component : ResetToken
    },
    {
        path : '/valid/:id',
        exact : true,
        component : ValidEmail
    },
    {
        path : '/debug/mission',
        exact : true,
        render : () => adminAndProprioAuthenticate() ? <DebugMission /> : <Redirect to="/"/>
    },
    {
        path: '/app/messages',
        exact: true,
        component: Messages
    },
    {
        component: PageNotFound,
    }
];

function getRoutes(location) {
    return (
        <Switch>
            {typeof location === "undefined" ?
                renderRoutes(Routes)
                :
                renderRoutes(Routes, {location: location})
            }
        </Switch>
    )
}

export default getRoutes
