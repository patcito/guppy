// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {
  size: number,
  children: React$Node,
};

class CircularOutlineButton extends Component {
  state = {
    isHovered: false,
    pathLength: 0,
  };

  componentDidMount() {
    const pathLength = Math.ceil(this.node.getTotalLength()) + 1;
    this.setState({ pathLength });
  }

  render() {
    const { size, children } = this.props;
    const { isHovered, pathLength } = this.state;

    // Not using `viewBox` because I want the stroke width to be a constant
    // 2px regardless of SVG size.
    return (
      <ButtonElem
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <Svg width={size} height={size}>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{
                  stopColor: '#ff416c',
                  stopOpacity: 1,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: '#ff4b2b',
                  stopOpacity: 1,
                }}
              />
            </linearGradient>
          </defs>
          <Ellipse
            innerRef={node => (this.node = node)}
            rx={size / 2}
            ry={size / 2}
            cx={size / 2}
            cy={size / 2}
            fill="none"
            stroke="url(#grad1)"
            strokeWidth={2}
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: isHovered ? 0 : pathLength,
            }}
          />
        </Svg>
        {children}
      </ButtonElem>
    );
  }
}

const ButtonElem = styled.button`
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Svg = styled.svg`
  overflow: visible;
  position: absolute;
`;

const Ellipse = styled.ellipse`
  transform: rotate(-90deg);
  transform-origin: center center;
  transition: stroke-dashoffset 500ms;
`;

export default CircularOutlineButton;