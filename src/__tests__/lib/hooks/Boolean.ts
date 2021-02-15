import { renderHook } from '@testing-library/react-hooks';
import useBoolean from 'lib/hooks/Boolean';
import TestRenderer from 'react-test-renderer';
const { act } = TestRenderer;

describe('useBoolean tests', () => {
    it('returns false by default', () => {
        const { result } = renderHook(() => useBoolean()); 

        expect(result.current[0]).toBe(false);
    });

    it('set function sets boolean to true', () => {
        const { result } = renderHook(() => useBoolean());

        act(() => result.current[1]());

        expect(result.current[0]).toBe(true);
    });
});