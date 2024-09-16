import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Site {
  id: string;
  name: string;
  address: string;
  contact: string;
}

interface SitesState {
  sites: Site[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SitesState = {
  sites: [],
  status: 'idle',
};

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {
    setSites: (state, action: PayloadAction<Site[]>) => {
      state.sites = action.payload;
    },
    setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'failed'>) => {
      state.status = action.payload;
    },
  },
});

export const { setSites, setStatus } = sitesSlice.actions;

export const selectAllSites = (state: RootState) => state.sites.sites;

export default sitesSlice.reducer;
