import {Switch, Redirect} from "react-router-dom";
import React from 'react';
import {renderRoutes} from "react-router-config";
import Home from '../../view/home/home'
import PageNotFound from '../../view/404/404.js'
import Proprietaire from '../../view/proprietaire/proprietaire'
import Partenaire from '../../view/partenaire/partenaire'
import {loadHomeData} from '../../reducer/home'
import ConfierVosBiens from '../../view/page/confier-vos-biens/confier-vos-biens'
import LaisserVousGuider from '../../view/page/laisser-vous-guider/laisser-vous-guider'
import Recherche from '../../view/recherche/recherche'
import FreelanceMission from '../../view/partenaire/mission/mission'
import DashboardFreelance from '../../view/partenaire/dashboard/dashboard'
import Messages from '../../view/messages/messages'
import DevenirFreelance from '../../view/partenaire/devenirFreelance/devenir-freelance'
import StatistiquesFreelance from "../../view/partenaire/statistiques/statistiques";
import { freelanceAuthenticate } from "./middleware";
import FreelanceProfile from "../../view/partenaire/profile/profile";
import ProprietaireProfile from "../../view/proprietaire/profil/profil";

export const Routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        loadData: () => loadHomeData()
    },
    {
        path: '/profile/proprietaire',
        exact: true,
        component: ProprietaireProfile,
    },
    {
        path: '/profile/freelance',
        exact: true,
        component: FreelanceProfile,
    },
    {
        path: '/profile/:name',
        exact: true,
        component: Partenaire,
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
        path: '/laisser-vous-guider',
        exact: true,
        component: LaisserVousGuider
    },
    {
        path: '/missions',
        exact: true,
        render: () => freelanceAuthenticate() ? <FreelanceMission /> : <Redirect to="/"/>
    },
    {
        path: '/dashboard/freelancer',
        exact: true,
        render: () => freelanceAuthenticate() ? <DashboardFreelance /> : <Redirect to="/"/>
    },
    {
        path: '/analytics/views',
        exact: true,
        render: () => freelanceAuthenticate() ? <StatistiquesFreelance /> : <Redirect to="/"/>
    },
    {
        path: '/messages',
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
