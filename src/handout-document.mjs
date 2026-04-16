import React from 'react';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { IMAGE_URLS } from './image-urls.mjs';

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 9,
    fontFamily: 'Helvetica',
    lineHeight: 1.3,
    color: '#1f2937',
  },
  title: {
    fontSize: 19,
    fontWeight: 700,
    color: '#0f2d5c',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 10.5,
    marginBottom: 10,
    color: '#334155',
  },
  section: {
    border: '1 solid #d1d5db',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 11.5,
    fontWeight: 700,
    color: '#0f2d5c',
    marginBottom: 4,
  },
  bullet: {
    marginBottom: 2.5,
  },
  integrationTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 4,
    color: '#0f2d5c',
  },
  integrationText: {
    fontSize: 9,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  col: {
    flex: 1,
  },
  imageTile: {
    border: '1 solid #d1d5db',
    borderRadius: 4,
    padding: 5,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 148,
    objectFit: 'cover',
    borderRadius: 3,
    marginBottom: 4,
  },
  imageCaption: {
    fontSize: 8,
    color: '#475569',
  },
  imagePlaceholder: {
    width: '100%',
    height: 148,
    border: '1 dashed #94a3b8',
    borderRadius: 3,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  imagePlaceholderText: {
    fontSize: 8,
    color: '#64748b',
    textAlign: 'center',
  },
  footer: {
    marginTop: 4,
    fontSize: 8,
    color: '#64748b',
  },
});

function Bullet({ text }) {
  return React.createElement(Text, { style: styles.bullet }, `• ${text}`);
}

function VisualTile({ src, caption }) {
  return React.createElement(
    View,
    { style: styles.imageTile },
    src
      ? React.createElement(Image, { style: styles.image, src })
      : React.createElement(
          View,
          { style: styles.imagePlaceholder },
          React.createElement(
            Text,
            { style: styles.imagePlaceholderText },
            'Image unavailable in this environment. Use provided event image for final print.'
          )
        ),
    React.createElement(Text, { style: styles.imageCaption }, caption)
  );
}

export function HandoutDocument({ imageSources = IMAGE_URLS }) {
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.page },
      React.createElement(Text, { style: styles.title }, 'Integrated Team Strategy Handout'),
      React.createElement(
        Text,
        { style: styles.subtitle },
        'One-sheet, dual-sided summary connecting Scouting, Build Team, and Programming Team impact.'
      ),
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionHeader }, 'Scouting Team'),
        React.createElement(Bullet, {
          text: 'Last year we entered most matches blind and paid for it in strategy and alliance outcomes.',
        }),
        React.createElement(Bullet, {
          text: 'This year, our scouting app lets admins monitor coverage, assign matches, and review pre-scouting.',
        }),
        React.createElement(Bullet, {
          text: 'We collect autonomous path data, averaged route trends, and scoring heatmaps for every team.',
        }),
        React.createElement(Bullet, {
          text: 'Team lists come from TBA and live EPA comes from Statbotics, improving real-time match prep and alliance selection.',
        }),
        React.createElement(Bullet, {
          text: 'Pit scouting captures desirable robot qualities; match notes are condensed into digestible insights by our fine-tuned LLM.',
        })
      ),
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionHeader }, 'Build Team'),
        React.createElement(Bullet, {
          text: 'Build decisions are driven by observed scoring locations, autonomous constraints, and repeatable design patterns from scouting data.',
        }),
        React.createElement(Bullet, {
          text: 'Pit scouting highlights desirable mechanisms and reliability traits, giving Build concrete targets before redesign cycles.',
        }),
        React.createElement(Bullet, {
          text: 'Build and Programming align on hardware capabilities needed for defensive autos, precision paths, and robust control.',
        })
      ),
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionHeader }, 'Programming Team'),
        React.createElement(Bullet, {
          text: 'Programming uses scouting route data to create defensive autonomous routines that block specific opponent paths.',
        }),
        React.createElement(Bullet, {
          text: 'Heatmaps show where opponents can score, enabling efficient defense with less wasted movement.',
        }),
        React.createElement(Bullet, {
          text: 'Strategy now translates directly into autonomous and teleop behavior, producing consistent on-field execution.',
        })
      ),
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.integrationTitle }, 'How Integration Changed Results'),
        React.createElement(
          Text,
          { style: styles.integrationText },
          'Scouting informs Programming and Build with objective data; Build gives Programming reliable hardware to execute strategic plans; Programming turns scouting intelligence into actionable autonomous and defensive behavior. Together, this is a night-and-day improvement in match prep, alliance selection, and student development.'
        )
      ),
      React.createElement(
        Text,
        { style: styles.footer },
        'Standard Letter format • Designed for duplex print (front side)'
      )
    ),
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.page },
      React.createElement(Text, { style: styles.title }, 'Supporting Visuals (Back Side)'),
      React.createElement(
        Text,
        { style: styles.subtitle },
        'Images from the EDD and provided scouting/program/build references.'
      ),
      React.createElement(
        View,
        { style: styles.row },
        React.createElement(
          View,
          { style: styles.col },
          React.createElement(VisualTile, {
            src: imageSources[0],
            caption: 'EDD strategic decisions reference',
          }),
          React.createElement(VisualTile, {
            src: imageSources[1],
            caption: 'Scouting + strategy visual reference',
          })
        ),
        React.createElement(
          View,
          { style: styles.col },
          React.createElement(VisualTile, {
            src: imageSources[2],
            caption: 'Build-program integration reference',
          }),
          React.createElement(VisualTile, {
            src: imageSources[3],
            caption: 'Programming-scouting integration reference',
          })
        )
      ),
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(Text, { style: styles.sectionHeader }, 'Quick Talking Points'),
        React.createElement(Bullet, { text: 'From blind match prep to data-backed decisions' }),
        React.createElement(Bullet, { text: 'Defensive autos built from real opponent path data' }),
        React.createElement(Bullet, { text: 'Alliance selection strengthened via TBA + Statbotics inputs' }),
        React.createElement(Bullet, { text: 'New students learn faster by comparing what works across teams' })
      ),
      React.createElement(
        Text,
        { style: styles.footer },
        'Standard Letter format • Designed for duplex print (back side)'
      )
    )
  );
}
