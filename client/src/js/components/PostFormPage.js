import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { graphql } from 'react-apollo';
import CreateBlogPost from '../graphql/mutation/blogPost';
import UploadImageAction from '../actions/uploadImage';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class PostFormPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postContent: '<p></p>',
      imgUrl: null,
      editorState: EditorState.createEmpty(),
    }
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.savePost = this.savePost.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      postContent: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    });
  }

  uploadImageCallBack(file) {
     return UploadImageAction(file);
  }

  savePost(status, e) {
    e.preventDefault();
    this.props.CreateBlogPostMutation({
      variables: {
        blogInput: {
          title: 'First',
          content: this.state.postContent,
          status,
          imgUrl: ''
        }
      }
    });
  }

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <p>Create New Blog
          <br />
          <a onClick={(e) => this.savePost('draft', e)} className="btn btn-sm">Save as draft</a>
          <a onClick={(e) => this.savePost('published', e)} className="btn btn-sm">Publish</a>
          <a className="btn btn-sm">Preview</a>
        </p>
        <Editor
          onEditorStateChange={this.onEditorStateChange}
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbarClassName="demo-toolbar-absolute"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, previewImage: true },
          }}
        />
      </div>
    )
  }
}

export default graphql(CreateBlogPost, { name: 'CreateBlogPostMutation' })(PostFormPage);
