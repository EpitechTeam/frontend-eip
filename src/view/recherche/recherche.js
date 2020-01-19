import React, { useState } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Menu,
  Pagination,
  Panel,
  ClearRefinements,
  CurrentRefinements
} from 'react-instantsearch-dom';
import './recherche.css'

import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';
import { MDBRow, MDBCol } from 'mdbreact';

const DEBOUNCE_TIME = 700;
const searchClient = algoliasearch(
  'C3JQIECXEF',
  '5f649ebc540132861d3c173fe706f1f0'
)

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name) {
  const encodedName = name;

  return encodedName
    .split(' ')
    .map(encodeURIComponent)
    .join('+');
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
  const decodedSlug = slug;

  return decodedSlug
    .split('+')
    .map(decodeURIComponent)
    .join(' ');
}

const createURL = state => {
  const isDefaultRoute =
    !state.query &&
    state.page === 1 &&
    (state.menu && !state.menu.city);

  if (isDefaultRoute) {
    return '/recherche';
  }

  const categoryPath = state.menu.city
    ? `${getCategorySlug(state.menu.city)}/`
    : '';

  return `/recherche/${categoryPath}`;
};

const searchStateToUrl = searchState =>
  searchState ? createURL(searchState) : '';

const urlToSearchState = location => {
    var category
    if (typeof document === "undefined") {
        const pathnameMatches = location.match(/recherche\/(.*?)\/?$/);
        category = getCategoryName((pathnameMatches && pathnameMatches[1]) || '');
    }
    else {
        const pathnameMatches = location.pathname.match(/recherche\/(.*?)\/?$/);
        category = getCategoryName((pathnameMatches && pathnameMatches[1]) || '');
    }
 
  return {
    menu: {
      city: decodeURIComponent(category),
    }
  };
};

const Hit = ({ hit }) => (
  <MDBCol xl="4">
    <a href={"/profile/" + hit.firstname + "." + hit.lastname} title={hit.name}>
      <img src={hit.img} alt={hit.name} width="340" height="270"></img>
    </a>
    <a href={hit.link} title={hit.lastname}>{hit.lastname}</a>
    <p href={hit.link} title={hit.firstname}>{hit.firstname}</p>
    <p>{hit.city}</p>
  </MDBCol>
);

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

const Recherche = ({ location, history }) => {
  const [searchState, setSearchState] = useState(urlToSearchState(location));
  const [debouncedSetState, setDebouncedSetState] = useState(null);

  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        history.push(searchStateToUrl(updatedSearchState), updatedSearchState);
      }, DEBOUNCE_TIME)
    );

    setSearchState(updatedSearchState);
  };

  return (
    <div className="specialContainerRecherche">
      <InstantSearch searchClient={searchClient} indexName="freelancer" searchState={searchState} onSearchStateChange={onSearchStateChange} createURL={createURL}>
        <MDBRow className="mt-5">
          <MDBCol xl="2">
            <ClearRefinements />

            <Panel className="mt-5" header="Ville">
              <Menu attribute="city" />
            </Panel>
          </MDBCol>

          <MDBCol xl="10">
            <SearchBox translations={{ placeholder: 'Ville, Pays, Région...' }} />
            <CurrentRefinements />

            <MDBRow>
              <Hits className="mt-5" hitComponent={Hit} />
            </MDBRow>

            <div className="pagination">
              <Pagination />
            </div>
          </MDBCol>
        </MDBRow>
      </InstantSearch>
    </div>
  );
};

Recherche.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
};

export default Recherche;
