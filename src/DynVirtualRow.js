import React from 'react';
import { useVirtual } from 'react-virtual';

export default React.forwardRef(({ rows, head, foot, children }, ref) => {
  const parentRef = React.useRef();
  const [rev, setRev] = React.useState(false);
  const rowVirtualizer = useVirtual({
    size: rows.length + 2,
    parentRef,
    estimateSize: React.useCallback(
      (index) =>
        index === 0
          ? rev
            ? 10
            : 100
          : index === rows.length + 1
          ? rev
            ? 100
            : 50
          : 30,
      [rev],
    ),
  });

  React.useImperativeHandle(ref, () => ({
    toggleRev() {
      setRev(!rev);
      parentRef.current.scrollTo(0, 0);
    },
  }));

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
