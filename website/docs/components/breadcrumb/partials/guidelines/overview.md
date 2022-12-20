A “breadcrumb” (or “breadcrumb trail”) is a type of secondary navigation that reveals the user's location in a website or Web application.

## Combinations

### Text only

<div>
	<Hds::Breadcrumb>
  	<Hds::Breadcrumb::Item @text="Level 1" />
  	<Hds::Breadcrumb::Item @text="Level 2" />
  	<Hds::Breadcrumb::Item @text="Level 3" />
  </Hds::Breadcrumb>
</div>

### With icon

<div>
	<Hds::Breadcrumb>
  	<Hds::Breadcrumb::Item @text="Level 1" @icon="org" />
  	<Hds::Breadcrumb::Item @text="Level 2" @icon="folder" />
  	<Hds::Breadcrumb::Item @text="Level 3" @icon="user" />
  </Hds::Breadcrumb>
</div>

### Truncated

<div>
	<Hds::Breadcrumb>
		<Hds::Breadcrumb::Item @text="Level 1" />
		<Hds::Breadcrumb::Truncation>
			<Hds::Breadcrumb::Item @text="Level 2" @icon="org" />
		</Hds::Breadcrumb::Truncation>
		<Hds::Breadcrumb::Item @text="Level 3" />
	</Hds::Breadcrumb>
</div>
