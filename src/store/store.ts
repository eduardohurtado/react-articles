//Interfaces
interface IAppStateMongo {
  articles: {
    id: string;
    name?: string;
    title: string;
    description: string;
    gender?: string;
  }[];
  isLoading: boolean;
}

interface IAction {
  type: string;
  id: string;
  title: string;
  description: string;
  gender: string;
  payload: [];
}

//APP default initial state
const initialStateMongo: IAppStateMongo = {
  articles: [
    {
      id: "5",
      title: "Testing title redux",
      description: "1993",
    },
  ],
  isLoading: true,
};

const reducer = (
  state = initialStateMongo,
  action: IAction
): IAppStateMongo => {
  if (action.type === "DOWNLOAD_TASKS_MONGO") {
    const checkIfEmpty = (): boolean => {
      if (action.payload.length < 1) {
        return true;
      } else {
        return false;
      }
    };
    return {
      ...state,

      articles: action.payload,
      isLoading: checkIfEmpty(),
    };
  } else if (action.type === "TASK_DELETE") {
    console.log("Task deleted from server:", action.id);
  } else if (action.type === "TEST") {
    console.log("Test looking good.");
  }

  return state;
};

export default reducer;
