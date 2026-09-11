import React from 'react';
import JavaneseElegantTemplate from '../components/JavaneseElegantTemplate';

/**
 * InvitationView — public-facing invitation page.
 *
 * Supports personalised guest name via query param:
 *   /invitation/preview?to=Bapak%20Santoso
 *
 * Data is loaded from localStorage (saved by EditorPage).
 */
const InvitationView = () => {
  // ── Read guest name from URL ──────────────────────────────
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('to') ? decodeURIComponent(params.get('to')) : '';

  // ── Load saved invitation data ────────────────────────────
  const loadData = () => {
    try {
      const saved = localStorage.getItem('invitationData');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const data = loadData();

  return (
    <JavaneseElegantTemplate
      data={data}
      guestName={guestName}
      isPreview={false}
    />
  );
};

export default InvitationView;
