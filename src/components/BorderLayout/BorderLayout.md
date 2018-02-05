#### All features in use
```
const styles = require('./demo.scss');
<div id="all-features-in-use">
<BorderLayout className={styles.outerBox200}
  scroll
  top={<div>top</div>}
  left={<div>left</div>}
  right={<div>right</div>}
  bottom={<div>bottom</div>}
>
  <div className={styles.height500}>Lorem Ipsum scroll</div>
</BorderLayout>
</div>
```
#### Main & Sidebar Scrolling
```
const styles = require('./demo.scss');
<div id="main-n-sidebar-scrolling">
<BorderLayout className={styles.outerBox200}
  top='top'
  right={(
    <Box scrollable>
      <div className={styles.height500}>
        <Box stretch className={styles.bgGreen}>right scrolling</Box>
      </div>
    </Box>
  )}
  bottom='bottom'
  scroll
>
  <div className={styles.height500}>
    <Box stretch className={styles.bgBlue}>Main scrolling</Box>
  </div>
</BorderLayout>
</div>
```
