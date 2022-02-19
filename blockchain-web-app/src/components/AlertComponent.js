import React from 'react'

function AlertComponent(props) {
  return (
      <div className='text-center container'>
    <div className='alert alert-success alert-dismissible fade' id='alertid' role="alert">
            <strong>Success!</strong>
    </div>

    <div className='alert alert-danger alert-dismissible fade' id='alertidf' role="alert">
        <strong>Failed!</strong>
    </div>

</div>

  )
}

export default AlertComponent