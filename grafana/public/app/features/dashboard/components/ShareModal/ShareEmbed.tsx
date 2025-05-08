import React, { FormEvent, PureComponent } from 'react';

import { AppEvents, SelectableValue } from '@grafana/data';
import { ClipboardButton, Field, Modal, RadioButtonGroup, Switch, TextArea } from '@grafana/ui';
import { appEvents } from 'app/core/core';

import { ShareModalTabProps } from './types';
import { buildIframeHtml } from './utils';

const themeOptions: Array<SelectableValue<string>> = [
  { label: 'Current', value: 'current' },
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
];

interface Props extends ShareModalTabProps {}

interface State {
  useCurrentTimeRange: boolean;
  selectedTheme: string;
  iframeHtml: string;
}

export class ShareEmbed extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      useCurrentTimeRange: true,
      selectedTheme: 'current',
      iframeHtml: '',
    };
  }

  componentDidMount() {
    this.buildIframeHtml();
  }

  buildIframeHtml = () => {
    const { panel, dashboard } = this.props;
    const { useCurrentTimeRange, selectedTheme } = this.state;

    const iframeHtml = buildIframeHtml(useCurrentTimeRange, dashboard.uid, selectedTheme, panel);
    this.setState({ iframeHtml });
  };

  onIframeHtmlChange = (event: FormEvent<HTMLTextAreaElement>) => {
    this.setState({ iframeHtml: event.currentTarget.value });
  };

  onUseCurrentTimeRangeChange = () => {
    this.setState(
      {
        useCurrentTimeRange: !this.state.useCurrentTimeRange,
      },
      this.buildIframeHtml
    );
  };

  onThemeChange = (value: string) => {
    this.setState({ selectedTheme: value }, this.buildIframeHtml);
  };

  onIframeHtmlCopy = () => {
    appEvents.emit(AppEvents.alertSuccess, ['Content copied to clipboard']);
  };

  getIframeHtml = () => {
    return this.state.iframeHtml;
  };

  render() {
    const { useCurrentTimeRange, selectedTheme, iframeHtml } = this.state;
    const isRelativeTime = this.props.dashboard ? this.props.dashboard.time.to === 'now' : false;

    return (
      <>
        <p className="share-modal-info-text">Generate HTML for embedding an iframe with this panel.</p>
        <Field
          label="Current time range"
          description={isRelativeTime ? 'Transforms the current relative time range to an absolute time range' : ''}
        >
          <Switch
            id="share-current-time-range"
            value={useCurrentTimeRange}
            onChange={this.onUseCurrentTimeRangeChange}
          />
        </Field>
        <Field label="Theme">
          <RadioButtonGroup options={themeOptions} value={selectedTheme} onChange={this.onThemeChange} />
        </Field>
        <Field
          label="Embed HTML"
          description="The HTML code below can be pasted and included in another web page. Unless anonymous access is enabled,
                the user viewing that page need to be signed into Grafana for the graph to load."
        >
          <TextArea
            data-testid="share-embed-html"
            id="share-panel-embed-embed-html-textarea"
            rows={5}
            value={iframeHtml}
            onChange={this.onIframeHtmlChange}
          />
        </Field>
        <Modal.ButtonRow>
          <ClipboardButton variant="primary" getText={this.getIframeHtml} onClipboardCopy={this.onIframeHtmlCopy}>
            Copy to clipboard
          </ClipboardButton>
        </Modal.ButtonRow>
      </>
    );
  }
}
