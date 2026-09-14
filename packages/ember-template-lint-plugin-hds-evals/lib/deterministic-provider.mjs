export const metadata = {
  kind: "deterministic",
  name: "checked-in-corrections",
};

export async function generate({ scenario }) {
  return {
    source: scenario.baseline,
    usage: {
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
    },
  };
}

export async function correct({ scenario }) {
  return {
    source: scenario.expectedCorrection,
    usage: {
      inputTokens: 0,
      outputTokens: 0,
      costUsd: 0,
    },
  };
}
