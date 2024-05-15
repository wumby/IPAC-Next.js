import {render, screen} from '@testing-library/react';
import Nav from '@/components/Nav/Nav';
import { MantineProvider} from '@mantine/core'

test('it renders the nav bar heading', () => {
    render(<MantineProvider><Nav/></MantineProvider>)

    const heading = screen.getByText("Biological Features");
    
    expect(heading).toBeInTheDocument();
})