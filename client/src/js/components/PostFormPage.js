import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { graphql } from 'react-apollo';
import CreateBlogPost from '../graphql/mutation/blogPost';
import UploadImageAction from '../actions/uploadImage';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class PostFormPage extends Component {

  constructor(props) {
    super(props);
    this.content = {"entityMap":[],"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
    this.state = {
      postContent: '<p></p>',
      imgUrl: null,
      editorState: EditorState.createEmpty(),
      jsonPostContent: convertFromRaw(this.content)
    }
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onContentStateChange = this.onContentStateChange.bind(this);
    this.savePost = this.savePost.bind(this);
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      postContent: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
    });
  }

  onContentStateChange(jsonPostContent) {
    this.setState({
      jsonPostContent,
    });
  };

  uploadImageCallBack(file) {
     return UploadImageAction(file);
  }

  savePost(status, e) {
    e.preventDefault();
    const imgEntity = this.state.jsonPostContent.entityMap[0];
    const titleBlock = this.state.jsonPostContent.blocks;
    let postImgUrl = '';
    let postTitle = '';
    let postSubTitle = '';
    if (imgEntity) {
      postImgUrl = imgEntity.data.src;
    }
    if (titleBlock[0] !== '') {
      postTitle = titleBlock[0].text;
    }
    if (titleBlock[1]) {
      postSubTitle = titleBlock[1].text;
    }
    this.props.CreateBlogPostMutation({
      variables: {
        blogInput: {
          title: postTitle,
          content: this.state.postContent,
          status,
          imgUrl: postImgUrl,
          subTitle: postSubTitle
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
          onContentStateChange={this.onContentStateChange}
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
