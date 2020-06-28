import React from 'react';
import { useVirtual } from 'react-virtual';

export default React.forwardRef(({ rows, children }, ref) => {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
  });

  React.useImperativeHandle(ref, () => ({
    toTop() {
      parentRef.current.scrollTo(0, 0);
    },
  }));

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          maxHeight: `80vh`,
          width: `100%`,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                marginTop: `${virtualRow.start}px`,
              }}
            >
              {children(rows[virtualRow.index])}
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
