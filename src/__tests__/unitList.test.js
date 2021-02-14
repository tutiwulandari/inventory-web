import configureMockStore from 'redux-mock-store'
import {shallow} from 'enzyme';
import {UnitList} from "../pages";

const mockStore = configureMockStore();

describe('Unit List Component', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        const state = {
            findAllUnit: {
                data: null,
                loading: true,
                error: null
            },
            removeUnitById: {
                data: null,
                loading: false,
                error: null
            }
        }
        store = mockStore(state)
        wrapper = shallow(<UnitList store={store}/>).dive()
    });

    it('should return the data [] state', () => {
        expect(wrapper.props().units).toStrictEqual([])
    //    tobe (==), toStrictEqual (===)
    });

    // it('should have one div', () => {
    //     const component = shallow(<UnitList/>)
    //     expect(component.find('div')).toHaveLength(1)
    // })

    it('should return the loading [] from state', () => {
        expect(wrapper.props().isLoading).toBe(true)
    });
});