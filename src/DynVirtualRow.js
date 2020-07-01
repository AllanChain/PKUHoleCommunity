import React from 'react';
import { useVirtual } from 'react-virtual';

export default React.forwardRef(({ rows, head, foot, children }, ref) => {
  const parentRef = React.useRef();
  const [recalc, setRecalc] = React.useState(0);
  /**
   * Making use of React useCallback and react-virtual feature
   * react-virtual will recalculate height on estimateSize change
   * React will change useCallback on recalc change,
   *    even function does not
   * Conclusion: change recalc to recalculate
   */
  const rowVirtualizer = useVirtual({
    size: rows.length + 2,
    parentRef,
    estimateSize: React.useCallback(() => 50, [recalc]),
  });

  const recalculate = () => {
    console.log('resize');
    setRecalc(recalc + 1);
  };

  React.useImperativeHandle(ref, () => ({
    toggleRev() {
      recalculate();
      parentRef.current.scrollTo(0, 0);
    },
  }));

  React.useEffect(() => {
    window.addEventListener('resize', recalculate);
    return () => window.removeEventListener('resize', recalculate);
  });

  return (
    <>
      <div
        ref={parentRef}
        className="no-scrollbar"
        style={{
          maxHeight: `100%`,
          width: `100%`,
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const index = virtualRow.index;
            let content = <div style={{ height: '0.5em' }} />;
            if (index === rows.length + 1) {
              if (foot) content = foot;
            } else if (index === 0) {
              if (head) content = head;
            } else content = children(rows[index - 1]);
            return (
              <div
                key={index}
                ref={virtualRow.measureRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  marginTop: `${virtualRow.start}px`,
                }}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
});
