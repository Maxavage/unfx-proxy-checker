import React from 'react';
import OverlayIp from '../components/OverlayIp';
import OverlayJudges from '../components/OverlayJudges';
import { connect } from 'react-redux';

const Overlay = ({ ip, judges }) => [<OverlayIp key='ip' {...ip} />, <OverlayJudges key='judges' {...judges} />];

const mapStateToProps = ({ overlay: { ip, judges } }) => ({
    ip,
    judges
});

export default connect(mapStateToProps)(Overlay);
