import { CardStatus } from 'projects/@atlp/components/voyage/enums/card-status.enum';
import { IVoyageData } from 'projects/@atlp/components/voyage/interfaces';

export const VOYAGE_DATA: IVoyageData[] = [
  {
    id: 1,
    info: {
      countMessage: 0,
      status: '',
      title: 'VALERIE SCHULTE',
      id: '073VSR',
      name: 'CMA CGM SHIPPI',
      iconCompany: 'cma_cgm',
      port: '🇦🇪Khalifa Port',
      terminal: 'Khalifa terminal (ADT)',
      time: '10:00 AM',
      date: '02/10/2021'
    },
    rotation: {
      status: null,
      statusText: '',
      id: 15020039,
      time: '21:25',
      date: '17/06/2021'
    },
    customs: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021'
    },
    terminal: {
      status: CardStatus.rejected,
      statusText: 'Rejected',
      time: '21:25',
      date: '17/06/2021'
    },
    callRequest: {
      status: CardStatus.pending,
      statusText: 'Pending',
      time: '21:25',
      date: '17/06/2021',
      textInfo: 'SENT'
    },
    manifest: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021'
    },
    discharge: {
      status: CardStatus.addDl,
      statusText: 'Add D.L.',
      textDescr: 'No Discharge List Added'
    },
    loading: {
      status: CardStatus.addLl,
      statusText: 'Add L.L.',
      time: '21:25',
      date: '17/06/2021',
      textInfo: 'Submit before',
      duration: 37800
    }
  },
  {
    id: 2,
    info: {
      countMessage: 2,
      status: 'warning',
      title: 'ESPERANZA N',
      id: 'MG0676381811',
      name: 'Rais Hassan Saadi…',
      iconCompany: 'rais',
      port: '🇦🇪Khalifa Port',
      terminal: 'Khalifa terminal (ADT)',
      time: '10:00 AM',
      date: '02/10/2021'
    },
    rotation: {
      status: CardStatus.na,
      statusText: 'N/A',
      id: null,
    },
    customs: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021'
    },
    terminal: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021',
    },
    callRequest: {
      status: CardStatus.addCr,
      statusText: 'Add CR',
      time: '21:25',
      date: '17/06/2021',
      textInfo: 'Submit before',
      duration: 37800
    },
    manifest: {
      status: CardStatus.addMf,
      statusText: 'Add MF',
      time: '21:25',
      date: '17/06/2021',
      textDescr: 'No Manifest Added'
    },
    discharge: {
      status: CardStatus.addDl,
      statusText: 'Add D.L.',
      textDescr: 'No Discharge List Added'
    },
    loading: {
      status: CardStatus.addLl,
      statusText: 'Add L.L.',
      time: '',
      date: '',
      textInfo: '',
      textDescr: 'No Loading List Added'
    }
  },
  {
    id: 3,
    info: {
      countMessage: 0,
      status: '',
      title: 'QUEEN MARY 2',
      id: 'MG0676381811',
      name: 'MEDITERRANEAN…',
      iconCompany: 'queen_mary',
      port: '🇦🇪Khalifa Port',
      terminal: 'Khalifa terminal',
      time: '05:00 PM',
      date: '01/19/2021'
    },
    rotation: {
      status: null,
      statusText: '',
      id: 1901004218,
      time: '21:25',
      date: '17/06/2021'
    },
    customs: {
      status: CardStatus.blocked,
      statusText: 'Blocked',
      time: '21:25',
      date: '17/06/2021'
    },
    terminal: {
      status: CardStatus.blocked,
      statusText: 'Blocked',
      time: '21:25',
      date: '17/06/2021'
    },
    callRequest: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021',
      update: 'Last update',
      addition: 'SR'
    },
    manifest: {
      status: CardStatus.blocked,
      statusText: 'Blocked',
      time: '21:25',
      date: '17/06/2021'
    },
    discharge: {
      status: CardStatus.blocked,
      statusText: 'Blocked',
      time: '21:25',
      date: '17/06/2021'
    },
    loading: {
      status: CardStatus.blocked,
      statusText: 'Blocked',
      time: '21:25',
      date: '17/06/2021'
    }
  },
  {
    id: 4,
    info: {
      countMessage: 0,
      status: '',
      title: 'VALERIE SCHULTE',
      id: '073VSR',
      name: 'CMA CGM SHIPPI',
      iconCompany: 'cma_cgm',
      port: '🇦🇪Khalifa Port',
      terminal: 'Khalifa terminal (ADT)',
      time: '10:00 AM',
      date: '02/10/2021'
    },
    rotation: {
      status: null,
      statusText: '',
      id: 1901005397,
    },
    customs: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021'
    },
    terminal: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021'
    },
    callRequest: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021',
      update: 'Last update',
      addition: 'SR'
    },
    manifest: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021',
      update: 'Last update',
      addition: 'SR'
    },
    discharge: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021',
      update: 'Last update',
      addition: 'SR'
    },
    loading: {
      status: CardStatus.added,
      statusText: 'Added',
      time: '21:25',
      date: '17/06/2021'
    }
  },
  {
    id: 5,
    info: {
      countMessage: 0,
      status: '',
      title: 'VALERIE SCHULTE',
      id: '073VSR',
      name: 'CMA CGM SHIPPI',
      iconCompany: 'cma_cgm',
      port: '🇦🇪Khalifa Port',
      terminal: 'Khalifa terminal (ADT)',
      time: '10:00 AM',
      date: '02/10/2021'
    },
    rotation: {
      status: null,
      statusText: '',
      id: 200200617,
    },
    customs: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021'
    },
    terminal: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021'
    },
    callRequest: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021',
    },
    manifest: {
      status: CardStatus.addMf,
      statusText: 'Add MF',
      textDescr: 'No Manifest Added',
    },
    discharge: {
      status: CardStatus.addDl,
      statusText: 'Add D.L.',
      textDescr: 'No Discharge List Added',
    },
    loading: {
      status: CardStatus.addLl,
      statusText: 'Add L.L.',
      textDescr: 'No Loading List Added',
    }
  },
  {
    id: 6,
    info: {
      countMessage: 0,
      status: '',
      title: 'VALERIE SCHULTE',
      id: '073VSR',
      name: 'CMA CGM SHIPPI',
      iconCompany: 'cma_cgm',
      port: '🇦🇪Khalifa Port',
      terminal: 'Khalifa terminal (ADT)',
      time: '10:00 AM',
      date: '02/10/2021'
    },
    rotation: {
      status: null,
      statusText: '',
      id: 200200617,
    },
    customs: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021'
    },
    terminal: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021'
    },
    callRequest: {
      status: CardStatus.approved,
      statusText: 'Approved',
      time: '21:25',
      date: '17/06/2021',
    },
    manifest: {
      status: CardStatus.addMf,
      statusText: 'Add MF',
      textDescr: 'No Manifest Added',
    },
    discharge: {
      status: CardStatus.addDl,
      statusText: 'Add D.L.',
      textDescr: 'No Discharge List Added',
    },
    loading: {
      status: CardStatus.addLl,
      statusText: 'Add L.L.',
      textDescr: 'No Loading List Added',
    }
  }
];
