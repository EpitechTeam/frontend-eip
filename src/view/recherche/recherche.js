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
    (state.menu && !state.menu.ville);

  if (isDefaultRoute) {
    return '/recherche';
  }

  const categoryPath = state.menu.ville
    ? `${getCategorySlug(state.menu.ville)}/`
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
      ville: decodeURIComponent(category),
    }
  };
};

const Hit = ({ hit }) => (
  <div>
    <img src={hit.img} alt={hit.name} width="200" height="200"></img>
    <p>{hit.name}</p>
    <p>{hit.ville}</p>
  </div>
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
    <div className="container">
      <InstantSearch searchClient={searchClient} indexName="dev_places" searchState={searchState} onSearchStateChange={onSearchStateChange} createURL={createURL}>
        <div className="search-panel">
          <div className="left-panel">
            <ClearRefinements />

            <Panel className="mt-5" header="Ville">
              <Menu attribute="ville" />
            </Panel>

          </div>

          <div className="right-panel">
            <SearchBox placeholder="Ville, Pays, Région..." />
            <CurrentRefinements />

            <Hits className="mt-5" hitComponent={Hit} />

            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
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
