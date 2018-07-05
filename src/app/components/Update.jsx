import React from 'react';
import { ActionUpdateCheck } from '../actions/ActionUpdateCheck';
import { ActionDownload } from '../actions/ActionDownload';

export default class Update extends React.Component {
    constructor() {
        super();

        this.state = {
            opened: true,
            updateIsAvailable: false,
            isChecking: true,
            onDownloading: false,
            downloadProgress: 0,
            isDownloaded: false
        };
    }

    close() {
        this.setState({ opened: false });
    }

    onDownloadProgress(progress) {
        this.setState({ downloadProgress: progress * 100 });
    }

    onDownloadStart() {
        this.setState({ onDownloading: true });
    }

    onDownloadDone() {
        this.setState({ isDownloaded: true, opened: false });
    }

    componentWillMount() {
        ActionUpdateCheck(this.setState.bind(this), this.close.bind(this));
    }

    render() {
        return (
            // WUTAFACE
            <div className={this.state.opened ? this.state.onDownloading ? 'update-notify downloading' : this.state.isChecking ? 'update-notify checking' : 'update-notify' : 'update-notify closed'}>
                <div className="lds-ripple"><div></div><div></div></div>
                {
                    this.state.updateIsAvailable ?
                    <div className="update-container">
                        <div className="update-content">
                            <div className="update-version">
                                Available version: {this.state.latestVersion}
                            </div>
                            <div className="update-description">
                                {this.state.updateDescription}
                            </div>
                            <div className="update-features">
                                {this.state.updateFeatures.map((item, index) => <div className="feature-item" key={index}><div className="feature-name">{item.name}</div><div className="feature-description">{item.description}</div></div>)}
                            </div>
                        </div>
                        <div className="update-download">
                            <button className="button-two download-button" onClick={() => ActionDownload(this.state.downloads.x32, this.onDownloadStart.bind(this), this.onDownloadDone.bind(this), this.onDownloadProgress.bind(this))}>Download x32</button>
                            <button className="button-two download-button" onClick={() => ActionDownload(this.state.downloads.x64, this.onDownloadStart.bind(this), this.onDownloadDone.bind(this), this.onDownloadProgress.bind(this))}>Download x64</button>
                        </div>
                        <button className="button-two close-big-button" onClick={this.close.bind(this)}>Ok</button>
                    </div>
                    : ""
                }
                {
                    this.state.onDownloading ?
                    <div className="download-progress">
                        <div className="download-progress-bar" style={{width: this.state.downloadProgress + '%'}}></div>
                    </div>
                    : ""
                }
            </div>
        );
    }
}
