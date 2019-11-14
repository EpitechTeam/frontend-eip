import React from 'react'
import DocumentMeta from 'react-document-meta';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return { language : state.language }
}

class Meta extends React.Component {
  render() {
    const meta = {
      title: this.props.title === "" ? "Trouvez un partenaire pour gérer votre annonce Airbnb" : this.props.title,
      description: this.props.description === "" ? "Plus besoin de s'occuper soi-meme de son annonce Airbnb, facilitez vos locations courtes-durées en trouvant un partenaire de confiance" : this.props.description,
      meta: {
        charSet: 'utf-8',
        name: {
          keywords: 'Airbnb, location courte-durée, conciergerie'
        }
      }
    }

    return (
      <DocumentMeta {...meta} />
    )
  }
}

Meta.defaultProps = {
  title : "",
  description : ""
}

export default connect(mapStateToProps)(Meta)
